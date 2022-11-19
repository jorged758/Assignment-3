const Mongoose = require("mongoose");

const credentails = require("../config");
// gathering username and password from config file
var mongodb = `mongodb+srv://${credentails.username}:${credentails.password}@cluster0.oywxkfe.mongodb.net/?retryWrites=true&w=majority`;
// Try to connect to MONGODB USING mongoose instance
Mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });

var db = Mongoose.connection;
// Export mongoose instance to listen to port 5000, to run locally
module.exports = db;
