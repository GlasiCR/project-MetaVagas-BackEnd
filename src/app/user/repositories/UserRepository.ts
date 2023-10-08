import { ObjectId } from "mongoose";
import { UserDto } from "../dtos/UserDto";
import { JobDto } from "../../job/dtos/CreateJobDto";

class UserRepository {
    constructor(
        private model: any,
        private modelHistory: any
        ) { }

    async findByEmail(email: string) {
        return this.model.findOne({ email })
    }

    async create(user: UserDto) {
        return this.model.create(user)
    }

    async findById(id: string) {
        return this.model.findOne({ _id: id })
    }

    async update(id: string, user: UserDto) {
        return this.model.findByIdAndUpdate(id, user)
    }

    async includeFavoriteJob(data: any, job: JobDto){
        return this.model.findByIdAndUpdate(
            data.idUser,
            { $addToSet: { jobFavorite: job } },
            { new: true }
          )
    }

    async excludeFavoriteJob(data: ObjectId, job: JobDto){
        return this.model.updateOne(
            { _id: data }, 
            { $pull: { jobFavorite: job} },
            { new: true }
        )
    }

    async findByFavoriteJob(job: JobDto){
        return this.model.findOne({ jobFavorite: job })
    }

    async searchHistoryRecord(id: string, job: JobDto){
        await this.model.findByIdAndUpdate(
            {_id: id}, 
            { $pull: { searchHistory: { $in: job } } },
        )

        return this.model.findByIdAndUpdate(
            { _id: id},
            { $addToSet: { searchHistory: { $each: job } } },
            { new: true }
        )
    }

    async showHistory(idUser: string){
        return this.model.find(
            { _id: idUser },
            { "searchHistory": 1 }, 
            { $sort: -1}
        )
    }
}

export { UserRepository }