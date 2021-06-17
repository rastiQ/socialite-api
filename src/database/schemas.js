import mongoose from 'mongoose'
const { Schema } = mongoose

//registrated user schema
export const userSchema = new Schema({
    uid: String, //userid from firebase
    firstName: String,
    lastName: String,
    lastOnline: Date,
    image: String,
    createdAt: Date
})

//friendship between users
//status: 1 - pending, 2 - accepted
export const friendshipSchema = new Schema({
    senderID: mongoose.ObjectId,
    recieverID: mongoose.ObjectId,
    status: Number,
})

export const messageSchema = new Schema({
    senderID: mongoose.ObjectId,
    recieverID: mongoose.ObjectId,
    content: String,
    sendedAt: Date,
})

export const postSchema = new Schema({
    posterID: mongoose.ObjectId,
    content: String,
    postedAt: Date
})