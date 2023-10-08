import mongoose from "mongoose";
import { EnumTech } from "./EnumTech";

const TecnologySchema = new mongoose.Schema({
    technology: {type: String, enum: EnumTech, unique:true },
})

export type Tech = mongoose.InferSchemaType <typeof TecnologySchema>
export const Tech = mongoose.Model<Tech> = mongoose.model('Tech', TecnologySchema)