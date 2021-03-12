const express = require('express');
const router = express.Router();
const Questions = require('../models/questions');
const Users = require('../models/users');

router.get('/', async(req, res, next) => {
  //fetch all questions from db and send.
  try{
    const questions = await Questions.find();
    const ques = {};
    questions.forEach(question => {
        ques[question._id] = question
    })
    res.json(ques);
  }catch(err){
      res.json({error: err});
  }

  }).post('/add', async(req, res, next) => {
      //req:{optionOne, optionTwo, author}
    //add question to db
    //creating question doc
    const question = new Questions({
        optionOne: {
            text: req.body.optionOne
        },
        optionTwo: {
            text: req.body.optionTwo
        },
        author: req.body.author
    });
    try{
        //save returns the saved question in db.
        const newQuestion = await question.save();
        const updatedUser = await Users.findOneAndUpdate({id:req.body.author}, {$push : {questions:newQuestion._id}}, { new: true });
        const response = {
            newQuestion,
            updatedUser
        }
        res.json(response);
    }catch(err){
        res.json({error: err});
    }

  }).put('/answer', async(req, res, next) =>{
      //update question when answered by user.
      const { authedUser, qid, answer } = req.body //answer=optionOne|optionTwo
      try{
          //save returns the saved question in db.
           let option = {}
           option[answer+".votes"] = authedUser

           let ans = {}
            ans["answers."+qid] = answer

          const updatedQuestion = await Questions.findOneAndUpdate({_id: qid}, {$push: option}, { new: true })
          const updatedUser = await Users.findOneAndUpdate({id: authedUser}, {$set: ans}, { new: true })
          const response = {
              updatedQuestion,
              updatedUser
          }
          res.json(response);
      }catch(err){
          res.json({error: err});
          console.log("error")
      }

  });
  
  module.exports = router;