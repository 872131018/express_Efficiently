var express = require('express');
var router = express.Router();
/*
* Import the database connection
*/
var mongoose = require('mongoose');
/*
* Default route for /fillups
*/
router.get('/', function(req, res, next) {
    /*
    * If ajax request send fillup data as json otherwise render page
    */
    if(req.xhr) {
        mongoose.model('Fillup').find({}, function (err, fillups) {
            if (err) {
                return console.error(err);
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(fillups));
            }
        });
    } else {
        res.render('index', {});
    }
});
/*
* Delete spoofed method for deleting from list
*/
router.delete('/', function(req, res, next) {
    /*
    * Retrieve model by passed id and delete it
    */
    mongoose.model('Fillup').findById(req.body.id, function (err, fillup) {
        if (err) {
            return console.error(err);
        } else {
            fillup.remove(function (err, fillup) {
                if (err) {
                    return console.error(err);
                } else {
                    /*
                    * On success redirect to index page with cleared input
                    */
                    res.location('/fillups');
                    res.redirect('/fillups');
                }
            });
        }
    });
});
/*
* Default route for /fillups
*/
router.get('/new', function(req, res, next) {
    /*
    * Render the new fillup form
    */
    res.render('new', {});
});
/*
* PUT route for a new fillup
*/
router.put('/new', function(req, res, next) {
    /*
    * Set fields in the schema for fillup
    */
    mongoose.model('Fillup').create({
        station : req.body.station,
        address : req.body.address,
        gallons : req.body.gallons,
        miles : req.body.miles,
        price : req.body.price
    }, function (err, fillup) {
        if (err) {
            res.send("There was a problem adding the information to the database.");
        } else {
            /*
            * On success redirect to index page with cleared input
            */
            res.location('/fillups');
            res.redirect('/fillups');
        }
    });
});
/*
*
*/
router.get('/:id', function(req, res, next) {
    /*
    * Load fillup from the requested ID
    */
    mongoose.model('Fillup').findById(req.id, function (err, fillup) {
        if (err) {
            return console.error(err);
        } else {
            res.render('edit', {
                fillup: fillup
            });
        }
    });
        /*
        var fill_date = fill.date.toISOString();
        fill_date = fill_date.substring(0, fill_date.indexOf('T'));
        res.render('fills/show', {
            "fill_date" : fill_date,
            "fill" : fill
        });
        */
});
//GET the individual fill by Mongo ID
router.get('/:id/edit', function(req, res) {
    //search for the blob within Mongo
    mongoose.model('Fill').findById(req.id, function (err, fill) {
        if (err) {
            console.log('GET Error: There was a problem retrieving: ' + err);
        } else {
            //format the date properly for the value to show correctly in our edit form
            var fill_date = fill.date.toISOString();
            fill_date = fill_date.substring(0, fill_date.indexOf('T'));
            res.render('fills/edit', {
               title: 'Fill' + fill._id,
               "fill_date" : fill_date,
               "fill" : fill
           });
        }
    });
});
//PUT to update a fill by ID
router.put('/:id/edit', function(req, res) {
    // Get our REST or form values. These rely on the "name" attributes
    var station = req.body.station;
    var address = req.body.address;
    var gallons = req.body.gallons;
    var miles = req.body.miles;
    var price = req.body.price;

   //find the document by ID
    mongoose.model('Fill').findById(req.id, function (err, fill) {
        //update it
        fill.update({
            station : station,
            address : address,
            gallons : gallons,
            miles : miles,
            price : price
        }, function (err, fill_id) {
            if (err) {
                res.send("There was a problem updating the information to the database: " + err);
            } else {
                 res.redirect("/fills/" + fill._id);
            }
        });
    });
});
module.exports = router;
