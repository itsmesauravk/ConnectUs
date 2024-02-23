
const mongoose = require("mongoose")


const FriendshipSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Registration"
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Registration"
    },
    status:{
        type: String,
        enum: ["requested", "accepted", "rejected"],
        default: "requested"
    }
}, {timestamps: true})

module.exports = mongoose.model("Friendship", FriendshipSchema)