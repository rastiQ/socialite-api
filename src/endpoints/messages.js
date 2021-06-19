import { Message } from '../database/models/message.js'

export const findLastMessages = (userOneID, userTwoID, page, per_page) => {
    return new Promise((resolve, reject) => {
        Message.find({
            $or: [{
                $and: [
                    { senderID: userOneID },
                    { recieverID: userTwoID }
                ]
            },
            {
                $and: [
                    { senderID: userTwoID },
                    { recieverID: userOneID }
                ]
            }]
        })
        .sort({sendedAt})
        .skip((page - 1) * per_page)
        .limit(per_page)
        .then((messages) => {
            if(messages.length) resolve(messages)
            else reject('no_messages_found')
        })
    })
}

export const sendMessage = (senderID, recieverID, content) => {
    return new Promise((resolve, reject) => {
        Message.create({
            senderID: senderID,
            recieverID: recieverID,
            content: content,
            sendedAt: new Date()
        }).then(message => {
            resolve(message)
        }).catch(error => {
            reject(error)
        })
    })
}

export const deleteMessage = (messageID) => {
    return new Promise((resolve, reject) => {
        Message.deleteOne({_id: messageID}).then((message) => {
            if(message) resolve(message)
            else reject('message_not_found')
        })
    })
}