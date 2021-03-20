var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:num', function (req, res, next) {
  res.render('contestPage');
});

router.post('/:num', function (req, res, next) {
  req.body.success = false;
  res.send(req.body);
});

module.exports = router;
