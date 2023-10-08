import mongoose from "mongoose";
import { EnumTech } from "../../tecnologies/model/EnumTech";
import { EnumCity } from "../../cities/model/EnumCity";

const TechSearchSchema = new mongoose.Schema({
    technology: {type: String, enum: EnumTech},
    location:{type: String, enum: EnumCity || null},
    count: {type: Number, default: 1}
})

export type TechSearch = mongoose.InferSchemaType <typeof TechSearchSchema>
export const TechSearch = mongoose.Model<TechSearch> = mongoose.model('TechSearch', TechSearchSchema)