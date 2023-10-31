import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    jobFavorite: [{type: Object}],
    searchHistory: [{type: Object}]
}, {timestamps: true})

export type User = mongoose.InferSchemaType< typeof UserSchema >
export const User = mongoose.Model<User> = mongoose.model('User', UserSchema)