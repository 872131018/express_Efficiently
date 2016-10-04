var Header = React.createClass({
  render: function() {
    return (
      <div>
        This is the header!
      </div>
    );
  }
});

ReactDOM.render(
  <Header />,
  document.getElementById('header')
);
