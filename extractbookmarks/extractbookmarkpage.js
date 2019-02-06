//use on bookmark page in bookmark new tab page extension
//to get json bookmark data of bookmarks on that page
(()=>{
    var marks=document.querySelectorAll("a");

    var res=[];
    for (var x=0,l=marks.length;x<l;x++)
    {
        res.push({name:marks[x].innerText,link:marks[x].href});
    }

    return JSON.stringify(res);
})()