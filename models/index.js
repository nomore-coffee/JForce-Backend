const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.candidate = require("./candidate.model");

// db.ROLES = ["user", "admin", "moderator"];

module.exports = db;