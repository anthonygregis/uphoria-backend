const mongoose = require("mongoose")

const VideoSchema = new mongoose.Schema({
  description: {
    type: String,
    default: ""
  },
  shares: {
    type: Number,
    default: 0
  },
  userId: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "User"
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectID,
    ref: "User"
  }]
})

module.exports = mongoose.model("Video", VideoSchema)