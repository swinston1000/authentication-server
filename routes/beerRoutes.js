var express = require('express');
var router = express.Router();
var Beer = require("../models/BeerModel");

var handler =function(res, next){
  return function(err, beers) {
      if (err) {
        return next(error);
      } else {
        res.send(beers);
      }
    }
}

router.get('/', function(req, res, next) {
  Beer.find(handler(res, next));
});

router.get('/:id', function(req, res, next) {
  Beer.findById(req.params.id, handler(res,next));
});

//most routes removed to keep this short

module.exports = router