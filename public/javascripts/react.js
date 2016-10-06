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
var FillList = React.createClass({
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'JSON',
            success: function(data) {
                this.setState({fills: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    render: function() {
        var fill_list = this.props.fills.map(function(fill) {
            return (
                <ul>
                    <Fill date={ fill.date } station={ fill.station } address={ fill.address }>
                        {comment.text}
                    </Fill>
                </ul>
            );
        });
        return (
            <div className="fillList">
                { fill_list }
            </div>
        );
    }
});
var Fill = React.createClass({
    render: function() {
        return (
            <div>
                <li>{ this.props.date }</li>
                <li>{ this.props.station }</li>
                <li>{ this.props.address }</li>
            </div>
        );
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
/*
* Render the fill up list component
*/
ReactDOM.render(
    <FillList url='/public/fills.json'/>,
    document.getElementById('fill_list')
);
