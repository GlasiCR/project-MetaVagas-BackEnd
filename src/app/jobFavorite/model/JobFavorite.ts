import mongoose from "mongoose"

const JobFavoriteSchema = new mongoose.Schema({
    jobFavorite: [{type: mongoose.Schema.Types.ObjectId, ref: "Job"}]
}, {timestamps: true})

export type JobFavorite = mongoose.InferSchemaType< typeof JobFavoriteSchema >
export const JobFavorite = mongoose.Model<JobFavorite> = mongoose.model('JobFavorite', JobFavoriteSchema)