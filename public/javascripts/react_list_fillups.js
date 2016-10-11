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
                    id={ fillup._id }
                    station={ fillup.station }
                    address={ fillup.address }
                    date={ fillup.date }
                />
            );
        });
        return (
            <div>
                <a href={ this.props.url + "/new" } type="button" className="btn btn-success" role="button">Add Fillup</a>
                <h1>A List of Fillups</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Station</th>
                            <th>Address</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        { fillup_list }
                    </tbody>
                </table>
            </div>
        );
    }
});
var Fillup = React.createClass({
    render: function() {
        return (
            <tr>
                <td data-field="station">{ this.props.station }</td>
                <td data-field="address">{ this.props.address }</td>
                <td data-field="date">{ this.props.date }</td>
                <td>
                    <a href={ "/fillups/" + this.props.id } type="button" className="btn btn-primary" role="button">Edit</a>
                </td>
                <td>
                    <button type="button" className="btn btn-danger" data-delegate="fillup_delete" data-id={ this.props.id }>Delete</button>
                </td>
            </tr>
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
