import mongoose from "mongoose";
import { EnumCity } from "./EnumCity";

const CitySchema = new mongoose.Schema({
    city: {type: String, enum: EnumCity, unique:true},
})

export type City = mongoose.InferSchemaType <typeof CitySchema>
export const City = mongoose.Model<City> = mongoose.model('City', CitySchema)