var FillForm = React.createClass({
    getInitialState: function() {
        return { inputs: [
            'station', 'address',
            'gallons', 'miles', 'price'
        ] };
    },
    render: function() {
        var input_list = this.state.inputs.map(function(input) {
            return (
                <Input
                    name={ input }
                />
            );
        });
        return (
            <form action={ this.props.url } method="POST" role="form" className="form-horizontal">
                { input_list }
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
                    <button type="button" className="btn btn-success" data-delegate="fillup_add">Add Fillup</button>
                </div>
            </form>
        );
    }
});
/*
return (

        <div class="form-group">
            <label for="station" class="control-label col-sm-2">Station</label>
            <div class="col-sm-8">
                <input type="text" name="station" class="form-control"/>
            </div>
            <div class="col-sm-2"></div>
        </div>
);
*/

var Input = React.createClass({
    render: function() {
        return(
            <div className="form-group">
                <label for={ this.props.name } className="control-label col-sm-2">{ this.props.name }</label>
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
    <FillForm url='/fills'/>,
    document.getElementById('add_fillup')
);
