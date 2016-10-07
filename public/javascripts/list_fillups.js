var List_fillups = React.createClass({
    getInitialState: function() {
        return { fillups: [] };
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            type: 'GET',
            dataType: 'JSON',
            success: function(data) {
                this.setState({fillups: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        var fillup_list = this.state.fillups.map(function(fillup) {
            fillup.date = fillup.date.substr(0, fillup.date.indexOf('T'));
            return (
                <Fillup
                    key={ fillup._id }
                    station={ fillup.station }
                    address={ fillup.address }
                    date={ fillup.date }
                />
            );
        });
        return (
            <div className="fillList">
                <h1>A List of Fillups</h1>
                <ul>
                    { fillup_list }
                </ul>
            </div>
        );
    }
});
var Fillup = React.createClass({
    render: function() {
        return (
            <li>
                <p>{ this.props.station }</p>
                <p>{ this.props.address }</p>
                <p>{ this.props.date }</p>
            </li>
        );
    }
});
/*
* Render the fill up list component
*/
ReactDOM.render(
    <List_fillups url='/fillups'/>,
    document.getElementById('list_fillups')
);
