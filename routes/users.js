var express = require('express');
var router = express.Router();

const questionModel = require('../models/question');
const answer = require('../controller/answer')
const User = require('../models/user');

/* GET users listing. */
router.get('/addquestion', (req, res, next) => {
  res.render('addquestion');
});
router.post('/addquestion', async (req, res, next) => {
  let newquestion = new questionModel({
    innerHTML: req.body.innerHTML,
    inputFolder: req.body.inputFolder,
    outputFolder: req.body.outputFolder,
    num: req.body.num
  })
  res.send(await newquestion.save());
})

router.get('/scoreboard', async (req, res, next) => {
  let users = await User.find({ num: req.params.num }, "-password -_id -Email").sort({ 'Score': -1 }).exec();
  console.log(users);
  res.send(users);
});

router.get('/:num', async (req, res, next) => {
  let question = await questionModel.findOne({ num: req.params.num }, "-inputFolder -outputFolder");
  res.render('contestPage', { content: question.innerHTML, thisUser: req.user.Name });
});

router.post('/:num', async (req, res, next) => {
  let result = await answer.answer(req.params.num, req.body.Code, req.user, "javascript")
  req.body.success = result.Correct;
  console.log(result);
  res.send(result);
});


module.exports = router;
