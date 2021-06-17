import mongoose from 'mongoose'
import { findUserByUID, findUserByID, findUserFriends } from './user.js'


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
        findUserByID(userID).then(user => {
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
        const objectID = mongoose.mongo.ObjectId(req.params.id)
        findUserFriends(objectID).then(friends => {
            res.status(200).json(friends)
        }).catch(error => {
            if (error === 'no_friends_found') res.status(404).json({
                code: 'no_friends_found'
            })
        })
    } else {
        res.status(400).json({
            code: 'user_not_found'
        })
    }
}