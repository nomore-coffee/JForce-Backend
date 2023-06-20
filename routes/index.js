var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey = "testproject"
const USER = require("../models/user.model")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', async (req, res) => {
  const admin_save = {
    email: req.body.email,
    password: req.body.password,
  }
  try {
    const find_user = await USER.find({ email: admin_save.email })
    if (!find_user || find_user.length <= 0) {
      res.send({ statusCode: 404, message: "Incorrect Eamilid" })
    }
    else if (atob(find_user[0].password) !== admin_save.password){
      res.send({ statusCode: 404, message: "Incorrect Password" })
    }
    else {
      jwt.sign(find_user[0].toJSON(), secretKey, {expiresIn:"24h"},(err, token) => {
        if (err) {
          res.send({ statusCode: 500, message: 'Failed to generate token.' })
        }else{
          res.send({ statusCode: 200, message: {token:token , role:find_user[0].role , name:find_user[0].username} })
        }

      })
    }
  } catch (error) {
    console.log(error)
    res.send({ statusCode: 400, message: "Server Error" })

  }
})
module.exports = router;
