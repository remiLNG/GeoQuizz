var express = require('express');
var router = express.Router();
const path = require('path');


router.use(function timeLog(req, res, next) {
  next();
});


router.get('/', function(req, res) {
    res.sendFile(path.join( __dirname, "../Multiplayer.html"));
});

router.get('/FlagGuesser', function(req, res) {
  res.sendFile(path.join( __dirname, "../multi/FlagGuesser_lobbie.html"));
});

module.exports = router;