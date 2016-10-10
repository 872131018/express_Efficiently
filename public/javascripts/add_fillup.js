var FillForm = React.createClass({
    getInitialState: function() {
        return {
            inputs: [
                'station', 'address',
                'gallons', 'miles', 'price'
            ]
        };
    },
    render: function() {
        var input_list = this.state.inputs.map(function(input) {
            return (
                <Input
                    key={ input }
                    name={ input }
                />
            );
        });
        return (
            <form action={ this.props.url } method="POST" role="form" className="form-horizontal">
                { input_list }
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
                    <button type="submit" className="btn btn-success">Add Fillup</button>
                </div>
            </form>
        );
    }
});

var Input = React.createClass({
    render: function() {
        return(
            <div className="form-group">
                <label htmlFor={ this.props.name } className="control-label col-sm-2">{ this.props.name }</label>
                <div className="col-sm-8">
                    <input type="text" name={ this.props.name } className="form-control"/>
                </div>
                <div className="col-sm-2"></div>
            </div>
        );
    }
});
/*
* Render the add fill form
*/
ReactDOM.render(
    <FillForm url='/fillups'/>,
    document.getElementById('add_fillup')
);
