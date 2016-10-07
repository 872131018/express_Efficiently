var mongoose = require('mongoose');
/*
* Define the schema
*/
var fillup_schema = new mongoose.Schema({
    date : {
        type : Date,
        default : Date.now
    },
    station : String,
    address : String,
    gallons : Number,
    miles : Number,
    price : Number
});
mongoose.model('Fillup', fillup_schema);
