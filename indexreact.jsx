/*table body compares bookmarks to the database.
  BookmarkCompare(object bookmarkdata)
  bookmarkdata: give it combined bookmark data returned by gotdata() in main*/
class BookmarkCompare extends React.Component
{
  render()
  {
    return <>
      {this.props.bookmarkdata.map((x,i)=>{
        var indatabase;
        if (!x.dbname)
        {
          x.dbname="";
          indatabase="";
        }

        else
        {
          indatabase="in-database";
        }

        var count="";
        if (x.count && x.count>1)
        {
          count=x.count;
          indatabase="multi-count";
        }

        return <tr className={indatabase} key={i}>
          <td>{x.name}</td>
          <td>{x.dbname}</td>
          <td><a href={x.link} target="_blank">link</a></td>
          <td>{count}</td>
        </tr>;
      })}
    </>;
  }
}

/*almost same thing as bookmark compare but for things in database that arent
  in the bookmarks.
  NotInDatabaseCompare(object data) */
class NotInDatabaseCompare extends React.Component
{
  render()
  {
    return <>
      {this.props.data.map((x,i)=>{
        var count="";
        if (x.count && x.count>1)
        {
          count=x.count;
        }

        return <tr key={i}>
          <td>{x.name}</td>
          <td><a href={x.link} target="_blank">link</a></td>
          <td>{count}</td>
        </tr>;
      })}
    </>;
  }
}