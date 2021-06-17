import mongoose from 'mongoose'
import * as schemas from './schemas.js'

export const User = mongoose.model('User', schemas.userSchema)
export const Friendship = mongoose.model('Friendship', schemas.friendshipSchema)
export const Message = mongoose.model('Message', schemas.messageSchema)
export const Post = mongoose.model('Post', schemas.postSchema)