import mongoose from 'mongoose'
const { Schema } = mongoose

export const userSchema = new Schema({
    uid: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    lastOnline: Date,
    createdAt: { type: Date, required: true },
})