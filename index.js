window.onload=main;

//configuration:
//set to bookmark data output files
//made by extractbookmarkpage
//(so should be array)
const bookmarkdatafile=["data/bookmarkdata.json","data/bookmarkdata2.json"];
const hdbdatafile="data/hdb 2019-1-31.json"; //set to hdb backup file made by hdb

function main()
{
    getData(bookmarkdatafile[0],"bookmarks");
    getData(bookmarkdatafile[1],"bookmarks");
    getData(hdbdatafile,"database");
}

var collectedData={};
var dataCollected=0;
function getData(filename,whichOne)
{
    var r=new XMLHttpRequest();
    r.open("GET",filename);

    r.onreadystatechange=()=>{
        if (r.readyState==4)
        {
            if (!collectedData[whichOne])
            {
                collectedData[whichOne]=JSON.parse(r.response);
            }

            else
            {
                collectedData[whichOne]=[...collectedData[whichOne],...JSON.parse(r.response)];
            }

            dataCollected++;
            gotData();
        }
    };

    r.send();
}

function gotData()
{
    if (dataCollected!=bookmarkdatafile.length+1)
    {
        return;
    }

    var dbdata=collectedData.database.db;
    var sortedDb={};
    var dbentry;
    for (var x=0,l=dbdata.length;x<l;x++)
    {
        dbentry=dbdata[x];

        if (sortedDb[dbentry.url])
        {
            sortedDb[dbentry.url].count++;
        }

        else
        {
            sortedDb[dbentry.url]={name:dbentry.title,count:1};
        }
    }

    var bookmarkdata=collectedData.bookmarks;
    var bookmark;
    for (var x=0,l=bookmarkdata.length;x<l;x++)
    {
        bookmark=bookmarkdata[x];

        if (sortedDb[bookmark.link])
        {
            bookmark.dbname=sortedDb[bookmark.link].name;
            bookmark.count=sortedDb[bookmark.link].count;
            sortedDb[bookmark.link].inBookmarks=true;
        }
    }

    var notInBookmarks=[];
    for (var x in sortedDb)
    {
        if (!sortedDb[x].inBookmarks)
        {
            sortedDb[x].link=x;
            notInBookmarks.push(sortedDb[x]);
        }
    }

    // console.log(bookmarkdata);
    // console.log(notInBookmarks);

    ReactDOM.render(React.createElement(BookmarkCompare,{bookmarkdata}),document.querySelector(".bookmark-compare-body"));
    ReactDOM.render(React.createElement(NotInDatabaseCompare,{data:notInBookmarks}),document.querySelector(".not-in-bookmarks-body"));
}