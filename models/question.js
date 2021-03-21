const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
   innerHTML: String,
   inputFolder: String,
   outputFolder: String,
   num: Number
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question;