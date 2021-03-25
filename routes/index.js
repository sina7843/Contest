var express = require('express');
var router = express.Router();
var md5 = require('md5');
var passport = require('passport');

const UserModel = require('../models/user')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('Signup', { errmsg: '', msg: '' });
});

router.post('/', async (req, res, next) => {
  try {
    let newuser = new UserModel({
      Name: req.body.Name,
      Email: req.body.Email,
      password: md5(req.body.Password)
    });
    await newuser.save()
    res.render('Signup', { errmsg: '', msg: 'ثبت نام با موفقیت انجام شد.دیدار ما روز مسابقه' });
  }
  catch (err) {
    res.render('Signup', { errmsg: 'با این ایمیل قبلا ثبت نام شده', msg: '' });
  }
})
router.get('/login', (req, res, next) => {
  res.render('Login', { errmsg: '' });
});
router.get('/logine', (req, res, next) => {
  res.render('Login', { errmsg: 'ایمیل یا گذرواژه درست نیست' });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/questions/1/',
  failureRedirect: '/logine',
}), (req, res, next) => {
  res.json('done');
});

module.exports = router;
