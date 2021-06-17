import { User } from '../database/models.js'

export const findUserByUID = (userUID) => {
    return new Promise((resolve, reject) => {
        User.findOne({uid: userUID}).then(user => {
            if(user) resolve(user)
            else reject('user_not_found')
        })
    })
}

export const findUserByID = (userID) => {
    return new Promise((resolve, reject) => {
        User.findOne({_id: userID}).then(user => {
            if(user) resolve(user)
            else reject('user_not_found')
        })
    })
}