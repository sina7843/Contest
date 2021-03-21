var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var QUSchema = new Schema({
   User_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
   Question_id: { type: Schema.Types.ObjectId, ref: "Question", required: true },
   Score: { type: Number, default: -1 },
}, {
   timestamps: true
})

var Question_User = mongoose.model('Question_User', QUSchema);

module.exports = Question_User;