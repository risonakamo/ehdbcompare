class BookmarkCompare extends React.Component {
  render() {
    return React.createElement(React.Fragment, null, this.props.bookmarkdata.map((x, i) => {
      var indatabase;

      if (!x.dbname) {
        x.dbname = "";
        indatabase = "";
      } else {
        indatabase = "in-database";
      }

      var count = "";

      if (x.count && x.count > 1) {
        count = x.count;
      }

      return React.createElement("tr", {
        className: indatabase
      }, React.createElement("td", null, x.name), React.createElement("td", null, x.dbname), React.createElement("td", null, React.createElement("a", {
        href: x.link
      }, "link")), React.createElement("td", null, count));
    }));
  }

}