var express = require('express');
var router = express.Router();
const USER = require("../models/user.model")
const CANDIDATE = require("../models/candidate.model")
const authorize = require("../middleware/authorize")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/registerCandidate',async(req,res)=>{

  const admin_save = new CANDIDATE({
    candidateName:req.body.candidateName,
    totalVote:0,
  })
  try {
await admin_save.save()
  res.send({statusCode:200 , message:"Candidate Register"})
} catch (error) {
  res.send({statusCode:400 , message:"Duplicate Candidate"})
    
}
})
router.post('/registerAdmin',async(req,res)=>{
  const admin_save = new USER({
    username:req.body.username,
    phoneno:req.body.phoneno,
    email:req.body.email,
    password:btoa(req.body.password),
    role:"admin"
  })
  try {
await admin_save.save()
  res.send({statusCode:200 , message:"Admin Register"})
} catch (error) {
  res.send({statusCode:400 , message:"Duplicate Admin"})
}
})
router.post('/registerUser',async(req,res)=>{
  const admin_save = new USER({
    username:req.body.username,
    phoneno:req.body.phoneno,
    email:req.body.email,
    votedto:[],
    vote:0,
    password:btoa(req.body.password),
    role:"user"
  })
  try {
await admin_save.save()
  res.send({statusCode:200 , message:"User Register"})
} catch (error) {
  console.log(error)
  res.send({statusCode:400 , message:"Duplicate User"})
}
})

module.exports = router;
