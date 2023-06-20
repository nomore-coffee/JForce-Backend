const mongoose = require("mongoose");

const User = mongoose.model(
  "user",
  new mongoose.Schema({
    username:{type:String , required:true , unique:true},
    email:{type:String , required:true , unique:true},
    password:{type:String , required:true },
    phoneno:{type:String , required:true },
    votedto:{type:Array },
    vote:{type:Number , required:true },
    role:{type:String , required:true },
  }),
  "user"
);

module.exports = User;