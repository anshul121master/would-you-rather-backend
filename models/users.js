const mongoose = require("mongoose")

//defining questions schema.
const userSchema = mongoose.Schema({
    answers: {},
    avatarURL:String,
    id:String,
    name:String,
    questions:[String]
})

module.exports = mongoose.model("users", userSchema);
