import mongoose from 'mongoose'
import { findUserByUID, findUserByID, findUserFriends } from './user.js'
import { findLastMessages, deleteMessage, sendMessage } from './messages.js'

//User endpoints

//get user object with uid or _id
export const getUserByID = (req, res) => {
    const userID = req.params.id

    if (!mongoose.isValidObjectId(userID)) {
        findUserByUID(userID).then(user => {
            res.status(200).json(user)
        }).catch(error => {
            if (error === 'user_not_found') res.status(404).json({
                code: 'user_not_found'
            })
        })
    } else {
        const objectID = mongoose.ObjectId(userID)

        findUserByID(objectID).then(user => {
            res.json(user)
        }).catch(error => {
            if (error === 'user_not_found') res.status(404).json({
                code: 'user_not_found'
            })
        })
    }
}

export const getUserFriends = (req, res) => {
    const userID = req.params.id

    if (mongoose.isValidObjectId(userID)) {
        const objectID = mongoose.mongo.ObjectId(userID)
        findUserFriends(objectID).then(friends => {
            res.status(200).json(friends)
        }).catch(error => {
            if (error === 'no_friends_found') res.status(404).json({
                code: 'no_friends_found'
            })
        })
    } else {
        res.status(400).json({
            code: 'wrong_user_id'
        })
    }
}

//Messages endpoints

export const getLastMessages = (req, res) => {
    const page = req.query.page ? req.query.page : 1
    const per_page = req.query.per_page ? req.query.per_page : 10
    const userOneID = req.params.userOneID
    const userTwoID = req.params.userTwoID

    if(mongoose.isValidObjectId(userOneID) && mongoose.isValidObject(userTwoID)) {
        const userOneObjectID = mongoose.ObjectId(userOneID)
        const userTwoObjectID = mongoose.ObjectId(userTwoID)

        findLastMessages(userOneObjectID, userTwoObjectID, page, per_page).then((messages) => {
            res.status(200).json(messages)
        }).catch(error => {
            if(error === 'no_messages_found') res.status(404).json({
                code: 'no_messages_found'
            })
        })
    } else {
        res.status(400).json({
            code: 'wrong_user_id'
        })
    }
}

export const newMessage = (req,res) => {
    const senderID = req.body.senderID
    const recieverID = req.body.recieverID
    const content = req.body.content

    if(mongoose.isValidObjectId(senderID) && mongoose.isValidObjectId(recieverID)) {
        const senderObjectID = mongoose.ObjectId(senderID)
        const recieverObjectID = mongoose.ObjectId(recieverID)

        sendMessage(senderObjectID, recieverObjectID, content).then(message => {
            res.status(200).json(message)
        }).catch(error => {
            res.status(400).json(error)
        })
    } else {
        res.status(400).json({
            code: 'wrong_user_id'
        })
    }
}

export const deleteMessage = (req, res) => {
    const messageID = req.params.id

    if(mongoose.isValidObjectId(messageID)) {
        deleteMessage(messageID).then((message) => {
            res.status(200).json({
                code: 'message_deleted',
                message_id: message._id
            }).catch(error => {
                if(error === 'message_not_found') res.status(404).json({
                    code: 'message_not_found'
                })
            })
        })
    } else {
        res.status(400).json({
            code: 'wrong_message_id'
        })
    }
}