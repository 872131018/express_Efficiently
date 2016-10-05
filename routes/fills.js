var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST
/*
* Define some middleware to handle RESTful style calls
*/
router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function(req, res) {
      if(req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
      }
}));

//build the REST operations at the base for blobs
//this will be accessible from http://127.0.0.1:3000/fills if the default route for / is left unchanged
router.get('/', function(req, res, next) {
    //retrieve all blobs from Monogo
    mongoose.model('Fill').find({}, function (err, fills) {
        if (err) {
            return console.error(err);
        } else {
            for(fill in fills) {
                var fill_date = fills[fill].date.toISOString();
                fill_date = fill_date.substring(0, fill_date.indexOf('T'));
                fills[fill].date = fill_date;
            }
            // return the fills index page
            res.render('index', {
                'fills' : fills
            });
        }
    });
});
//POST a new blob
router.post('/', function(req, res, next) {
    // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
    var station = req.body.station;
    var address = req.body.address;
    var gallons = req.body.gallons;
    var miles = req.body.miles;
    var price = req.body.price;
    //call the create function for our database
    mongoose.model('Fill').create({
        station : station,
        address : address,
        gallons : gallons,
        miles : miles,
        price : price
    }, function (err, fill) {
        if (err) {
            res.send("There was a problem adding the information to the database.");
        } else {
            // If it worked and fill was created, set the header so the address bar doesn't still say /addfills
            res.location("fills");
            // And forward to success page
            res.redirect("/fills");
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
