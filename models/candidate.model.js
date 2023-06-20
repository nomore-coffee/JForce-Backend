const mongoose = require("mongoose");

const Candidate = mongoose.model(
  "candidate",
  new mongoose.Schema({
    candidateName:{type:String , required:true , unique:true},
    totalVote:{type:Number , required:true },
  }),
  "candidate"
);

module.exports = Candidate;