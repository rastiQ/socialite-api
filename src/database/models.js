import mongoose from 'mongoose'
import { userSchema } from './schemas.js'

export const User = mongoose.model('User', userSchema)