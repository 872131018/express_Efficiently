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
    render: function() {
        var fills = [
            {
                _id: 57f410453c23f81d05abe6bd,
                station: 'conoco',
                address: '123 colfax ave',
                gallons: 10,
                miles: 400,
                price: 2.14,
                __v: 0,
                date: Tue Oct 04 2016 14:25:41 GMT-0600 (MDT)
            }, {
                _id: 57f53f8332bc1e1e714f67e4,
                station: 'test',
                address: '435 test st',
                gallons: 10,
                miles: 310,
                price: 1.78,
                __v: 0,
                date: Wed Oct 05 2016 11:59:31 GMT-0600 (MDT)
            }, {
                _id: 57f56a8f401ec72b51cc0bee,
                station: '7-11',
                address: '12 broadway',
                gallons: 8,
                miles: 280,
                price: 2.42,
                __v: 0,
                date: Wed Oct 05 2016 15:03:11 GMT-0600 (MDT)
            }
        ];
        return (
            fills.map(function(fill) {
                return (

                )
            });
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
/*
* Render the fill up list component
*/
ReactDOM.render(
    <FillList data={ this.state.data }/>,
    document.getElementById('fill_list')
);
