const mongoose = require("mongoose")

//defining questions schema.
const questionSchema = mongoose.Schema({
    author: String,
    optionOne:{
        votes:[String],
        text: String
    },
    optionTwo:{
        votes:[String],
        text: String
    }
})

module.exports = mongoose.model("questions", questionSchema);
