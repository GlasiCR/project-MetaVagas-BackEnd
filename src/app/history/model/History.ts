import mongoose from "mongoose"

const HistorySchema = new mongoose.Schema({
    searchHistory: [{type: mongoose.Schema.Types.ObjectId, ref: "Job", unique: true}]
}, {timestamps: true})

export type History = mongoose.InferSchemaType< typeof HistorySchema >
export const History = mongoose.Model<History> = mongoose.model('History', HistorySchema)