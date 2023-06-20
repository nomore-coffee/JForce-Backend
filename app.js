var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
require("dotenv").config();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var voteRouter = require('./routes/vote')
var cors = require('cors')
var app = express();
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect(process.env.MONGOURI,{useNewUrlParser: true , useUnifiedTopology : true })
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/vote', voteRouter);

module.exports = app;
