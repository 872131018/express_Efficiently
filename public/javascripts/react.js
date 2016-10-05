var Header = React.createClass({
    render: function() {
        return (
            <div>
                <h1>{ this.props.title }</h1>
            </div>
        );
    }
});
var Add = React.createClass({
    render: function() {
        return (
            <div>
                <h3>
                    <a href='/fills/new'>{ this.props.text }</a>
                </h3>
            </div>
        )
    }
});
/*
* render the header component
*/
ReactDOM.render(
    <Header title='A list of fillups'/>,
    document.getElementById('header')
);
/*
* Render the add button component
*/
ReactDOM.render(
    <Add text='Add Fillup'/>,
    document.getElementById('add')
);
