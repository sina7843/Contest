let answer = [];

const Question = require('../models/question');
const QU = require('../models/Q_U');
const User = require('../models/user');
const compiler = require('./Compile');
var endtime = new Date("Mar 25, 2021 15:00:00");

answer.answer = async (num, code, user, language) => {
   let question = await Question.findOne({ num: num });
   let result = await compiler.run(language, code, question.inputFolder, question.outputFolder);
   let newScore;
   if (result.Correct) {
      var now = Date.now();
      newScore = Math.floor((endtime - now) / 1000);
      if (!(await QU.findOne({ User_id: user._id, Question_id: question._id }))) {
         new QU({
            User_id: user._id,
            Question_id: question._id,
            Score: newScore,
         }).save();
         await User.findByIdAndUpdate(user._id, { $inc: { Score: newScore } })
         result.Score = newScore;
      }
   }
   return result
}




module.exports = answer;