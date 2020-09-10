// require("dotenv").config()
const MONGO_URI = "mongodb://localhost/uphoria"
const mongoose = require("mongoose")

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const db = mongoose.connection

db.on("error", console.error.bind(console, "connection error:"))
db.once("open", function () {
  console.log("MongoDB connection opened on PORT", db.port)
})

module.exports.User = require("./User")
module.exports.Video = require("./Video")