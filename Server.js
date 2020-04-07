var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var router = express.Router();
var m = require("./model/mongo");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { valid } = require('./middleware');
const rtsIndex = require('./routes/index.router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  "extended": false
}));
app.use(cors());
app.use(cookieParser());
app.use('/api', rtsIndex);

app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

router.get("/", function(req, res) {
  res.json({
    "error": false,
    "message": "Enter correct URL"
  });
});


router.route("/Employee")
  .get(function(req, res) {
    response = {};
    m.find({}, function(err, data) {
      // Mongo command to fetch all data from collection.
      if (err) {
        response = {
          "error": true,
          "message": "Error fetching data"
        };
      } else {
        response = {
          "error": false,
          "message": data
        };
      }
      res.json(response);
    });
  });

router.route("/Detail/dev").get(function(req, res) {
  m.aggregate([{
      $match: {
        Role: "dev"
      }
    },
    {
      $unwind: "$Competency"
    },
    {
      $project: {
        Role: 1,
        E0: {
          $cond: [{
            $eq: ["$Competency.Level", "E0"]
          }, 1, 0]
        },
        E1: {
          $cond: [{
            $eq: ["$Competency.Level", "E1"]
          }, 1, 0]
        },
        E2: {
          $cond: [{
            $eq: ["$Competency.Level", "E2"]
          }, 1, 0]
        }
      }
    },
    {
      $group: {
        _id: "$Role",
        E0: {
          $sum: "$E0"
        },
        E1: {
          $sum: "$E1"
        },
        E2: {
          $sum: "$E2"
        }
      }
    }, {
      $project: {
        E0: {
          $toString: "$E0"
        },
        E1: {
          $toString: "$E1"
        },
        E2: {
          $toString: "$E2"
        }
      }
    }

  ], function(err, result) {

    if (err) {
      res.send(err)
    } else {
      res.json(result)
    }

  })


});

app.use('/', router);

app.listen(4000);
console.log("Listening to PORT 4000");
