import * as models from '../database/models.js'

export const findUserByUID = (userUID) => {
    return new Promise((resolve, reject) => {
        modelsUser.findOne({ uid: userUID }).then(user => {
            if (user) resolve(user)
            else reject('user_not_found')
        })
    })
}

export const findUserByID = (userID) => {
    return new Promise((resolve, reject) => {
        models.User.findOne({ _id: userID }).then(user => {
            if (user) resolve(user)
            else reject('user_not_found')
        })
    })
}

export const findUserFriends = (userID) => {
    return new Promise((resolve, reject) => {
        models.Friendship.find({ $and: [{ $or: [{ senderID: userID }, { recieverID: userID }] }, {status: 2}] })
        .select({senderID: 1, recieverID: 1})
        .then(friends => {
            if(friends.length) resolve(friends)
            else reject('no_friends_found')
        })
    })
}

export const countUserPosts = (userID) => {
    return new Promise((resolve) => {
        models.Post.find({postedID: userID}).count().then(count => {
            resolve(count)
        })
    })
}

export const findUserPosts = (userID, page, per_page) => {
    return new Promise((resolve, reject) => {
        models.Post.find({posterID: userID}).sort({postedAt})
        .skip((page - 1) * per_page)
        .limit(per_page)
        .then(posts => {
            if(posts.length) resolve(posts)
            else reject('no_posts_found')
        })
    })
}