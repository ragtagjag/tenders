var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('getting-started');
});

module.exports = router;