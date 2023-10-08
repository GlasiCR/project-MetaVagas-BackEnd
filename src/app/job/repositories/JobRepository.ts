import { CreateJobDto, JobDto } from "../dtos/CreateJobDto";

class JobRepository{
    constructor(private model: any){}

    async create(data: CreateJobDto){
        return this.model.create(data)
    }

    async findByFilter(query: JobDto){
        const findByfilters = this.model.find( query )
        return findByfilters
    }

    async findById(id: string) {
        return this.model.findOne({ _id: id })
    }

    async findByFilterNotLogged(data: JobDto){
        return this.model.find( data,
            {
                _id: 1, 
                careerLevel: 1, 
                jobWebsite: 1, 
                jobDescription: 1, 
                technology: 1
            }
        )
    }

    async showJobsPublic(limit: number, page: number){
        return this.model.find(
            {},
            {
                _id: 1, 
                careerLevel: 1, 
                jobWebsite: 1, 
                jobDescription: 1, 
                technology: 1
            }
        ).sort( { _id: 1 } ).skip(page > 0 ? ( ( page - 1 ) * limit ) : 0).limit(limit)
    }
    
    async getJobByPagination(limit: number, page: number){
        return this.model.find().sort( { _id: 1 } ).skip(page > 0 ? ( ( page - 1 ) * limit ) : 0).limit(limit)
    }
}

export { JobRepository }