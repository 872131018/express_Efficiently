var FillForm = React.createClass({
    render: function() {
        return (
            <form action={ this.props.url } method="POST" role="form" class="form-horizontal">
                <div class="form-group">
                    <label for="station" class="control-label col-sm-2">Station</label>
                    <div class="col-sm-8">
                        <input type="text" name="station" class="form-control"/>
                    </div>
                    <div class="col-sm-2"></div>
                </div>
                <div class="form-group">
                    <label for="address" class="control-label col-sm-2">Address</label>
                    <div class="col-sm-8">
                        <input type="text" name="address" class="form-control"/>
                    </div>
                    <div class="col-sm-2"></div>
                </div>
                <div class="form-group">
                    <label for="gallons" class="control-label col-sm-2">Gallons</label>
                    <div class="col-sm-8">
                        <input type="text" name="gallons" class="form-control"/>
                    </div>
                    <div class="col-sm-2"></div>
                </div>
                <div class="form-group">
                    <label for="miles" class="control-label col-sm-2">Miles</label>
                    <div class="col-sm-8">
                        <input type="text" name="miles" class="form-control"/>
                    </div>
                    <div class="col-sm-2"></div>
                </div>
                <div class="form-group">
                    <label for="price" class="control-label col-sm-2">Price</label>
                    <div class="col-sm-8">
                        <input type="text" name="price" class="form-control"/>
                    </div>
                    <div class="col-sm-2"></div>
                </div>
                <div class="col-sm-2"></div>
                <div class="col-sm-10">
                    <button type="button" class="btn btn-success" data-delegate="fillup_add">Add Fillup</button>
                </div>
            </form>
        );
    }
});
/*
* Render the add fill form
*/
ReactDOM.render(
    <FillForm url='/fills'/>,
    document.getElementById('add_fill')
);
