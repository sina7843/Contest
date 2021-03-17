var express = require('express');
var router = express.Router();
var md5 = require('md5');

const UserModel = require('../models/user')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { errmsg: '', msg: '' });
});
router.post('/', async (req, res, next) => {
  try {
    let newuser = new UserModel({
      Name: req.body.Name,
      Email: req.body.Email,
      password: md5(req.body.Password)
    });
    await newuser.save()
    res.render('index', { errmsg: '', msg: 'ثبت نام با موفقیت انجام شد.دیدار ما روز مسابقه' });
  }
  catch (err) {
    res.render('index', { errmsg: 'با این ایمیل قبلا ثبت نام شده', msg: '' });
  }
})

module.exports = router;
