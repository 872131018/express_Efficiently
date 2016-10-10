var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection

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
* Post route for a new fillup
*/
router.post('/', function(req, res, next) {
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
            * On success rerender index page 
            */
            res.render('index', {});
        }
    })
});
/* GET New Fill page. */
router.get('/new', function(req, res) {
    res.render('fills/new', { title: 'Add New Fill Up' });
});
// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('Fill').findById(id, function (err, fill) {
        //if it isn't found, we are going to repond with 404
        if (err) {
            res.status(404);
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        //if it is found we continue on
        } else {
            // once validation is done save the new item in the req
            req.id = id;
            // go to the next thing
            next();
        }
    });
});

router.route('/:id').get(function(req, res) {
    mongoose.model('Fill').findById(req.id, function (err, fill) {
        if (err) {
            console.log('GET Error: There was a problem retrieving: ' + err);
        } else {
            var fill_date = fill.date.toISOString();
            fill_date = fill_date.substring(0, fill_date.indexOf('T'));
            res.render('fills/show', {
                "fill_date" : fill_date,
                "fill" : fill
            });
        }
    });
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

//DELETE a Fill by ID
router.delete('/:id/edit', function (req, res) {
    //find fill by ID
    mongoose.model('Fill').findById(req.id, function (err, fill) {
        if (err) {
            return console.error(err);
        } else {
            //remove it from Mongo
            fill.remove(function (err, fill) {
                if (err) {
                    return console.error(err);
                } else {
                    res.redirect("/fills");
                }
            });
        }
    });
});

module.exports = router;
