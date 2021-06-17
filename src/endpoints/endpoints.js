import mongoose from 'mongoose'
import { findUserByUID, findUserByID } from './user.js'


//get user object with uid or _id
export const getUserByID = (req, res) => {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id)) {
        findUserByUID(id).then(user => {
            res.json(user)
        }).catch(error => {
            if (error === 'user_not_found') res.status(404).json({
                code: 'user_not_found'
            })
        })
    } else {
        findUserByID(id).then(user => {
            res.json(user)
        }).catch(error => {
            if(error==='user_not_found') res.status(404).json({
                code: 'user_not_found'
            })
        })
    }
}