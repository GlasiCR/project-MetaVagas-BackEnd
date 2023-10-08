import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    company: {type: String, required: true},
    salary: {type: Number, required: true},
    careerLevel: {type: String, required: true}, 
    jobWebsite: {type: String, required: true},
    jobDescription: {type: String, required: true},
    websiteLink: {type: String, required: true},
    location: {type: String, required: true},
    technology: [{type: String, required: true}],
    jobType: {type: String},
    workArrangement: {type: String},
    companySize: {type: String},
    levelExperience: {type: String},
}, {timestamps: true})

export type Job = mongoose.InferSchemaType< typeof JobSchema >
export const Job = mongoose.Model<Job> = mongoose.model('Job', JobSchema)