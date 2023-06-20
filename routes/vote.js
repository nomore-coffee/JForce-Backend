var express = require("express");
var router = express.Router();
const USER = require("../models/user.model");
const CANDIDATE = require("../models/candidate.model");
const authorize = require("../middleware/authorize")

router.post("/", authorize(['user']),async (req, res) => {
  const { candidateName, candidateid, username } = req.body;

  if (!candidateName || !candidateid || !username) {
    return res.send({ message: "Select One Please", statusCode: 400 });
  }

  try {
    let check = await USER.findOne({ username: username })
    if(check.vote===1){
      return res.send({message:"ALREADY VOTED", statusCode:400 })
    }
    let updatevote = await CANDIDATE.findOneAndUpdate(
      { _id: candidateid },
      { $inc: { totalVote: 1 } }
    );
    console.log(updatevote);
    if (updatevote) {
      let updatevoter = await USER.updateOne(
        { username: username },
        {
          $push: {
            votedto: candidateName,
          },
          vote:1
        }
        
      );
      console.log(updatevoter)
      if (updatevoter.matchedCount === 0) {
        let updatevote = await CANDIDATE.findOneAndUpdate(
            { _id: candidateid },
            { $inc: { totalVote: -1 } }
          );
        return res.send({ message: "Unkown Voter", statusCode: 400 });
      }
      return res.send({ message: "Vote Update", statusCode: 200 });

    }
  } catch (error) {
    return res.send({ message: "Error In System", statusCode: 404 });
  }
});

router.post("/getall",async (req,res)=>{
  try {
  let allData = await CANDIDATE.find({},{candidateName:1})
  return res.send({message:allData , statusCode:200})
} catch (error) {
  return res.send({message:error , statusCode:200})
}
})
router.post("/getalladmin",async (req,res)=>{
  try {
  let allData = await CANDIDATE.find({})
  return res.send({message:allData , statusCode:200})
} catch (error) {
  return res.send({message:error , statusCode:200})
}
})

module.exports = router;
