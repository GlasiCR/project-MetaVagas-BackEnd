import { DefaultError } from "../../../utils/defaultErrors/DefaultError";
import { STATUS_CODE } from "../../../utils/statusCode/StatusCode";
import { TechSearchDto } from "../../techSearch/dtos/TechSearchDto";
import { CreateJobDto, JobDto } from "../dtos/CreateJobDto";

class JobService{
    constructor(
        private repositoryJob: any,
        private repositoryTechSearch: any, 
        private repositoryUser: any, 
    ){}

    async create(data: CreateJobDto){
        try{
            return await this.repositoryJob.create(data)
        }catch(err: any){
            return DefaultError.messageError(err.message, STATUS_CODE.INTERNAO_SERVER_ERROR)
        }
    }
    
    async findByFilter(idUser: string, data: any){
        try {
            const jobAlready = await this.repositoryJob.findByFilter(data)
            if(jobAlready.length === 0){
                return DefaultError.messageError("Não há dados para a pesquisa", STATUS_CODE.NOT_FOUND)
            } 
                       
            if(data.technology && data.location === undefined){
                const techCountAlready = await this.repositoryTechSearch.findByTech(data)
                if(techCountAlready.length === 0){   
                    await this.repositoryTechSearch.createTechCount(data)
                }else{
                    await this.repositoryTechSearch.incrementTechCount(data)
                }   
            }

            if(data.technology && data.location){
                const techCountAlready = await this.repositoryTechSearch.findByTech(data)
                if(techCountAlready.length === 0){   
                    await this.repositoryTechSearch.createTechCount(data)
                }else{
                    await this.repositoryTechSearch.incrementTechCount(data)
                }   
            }

            await this.repositoryUser.searchHistoryRecord(idUser, jobAlready)
            return jobAlready
        } catch(err: any){
            return DefaultError.messageError("Não foi possível realizar a pesquisa, tente novamente mais tarde", STATUS_CODE.INTERNAO_SERVER_ERROR)
        }
    }

    async findByFilterNotLogged(data: JobDto){
        try {
            const jobAlready = await this.repositoryJob.findByFilterNotLogged(data)
            if(jobAlready.length === 0){
                return DefaultError.messageError("Não há dados para a pesquisa", STATUS_CODE.NOT_FOUND)
            }    
            if(data.technology && data.location === undefined){
                const techCountAlready = await this.repositoryTechSearch.findByTech(data)
                if(techCountAlready.length === 0){   
                    await this.repositoryTechSearch.createTechCount(data)
                }else{
                    await this.repositoryTechSearch.incrementTechCount(data)
                }   
            }

            if(data.technology && data.location){
                const techCountAlready = await this.repositoryTechSearch.findByTech(data)
                if(techCountAlready.length === 0){   
                    await this.repositoryTechSearch.createTechCount(data)
                }else{
                    await this.repositoryTechSearch.incrementTechCount(data)
                }   
            }

            return jobAlready
        
        } catch(err: any){
            return DefaultError.messageError("Não foi possível realizar a pesquisa, tente novamente mais tarde", STATUS_CODE.INTERNAO_SERVER_ERROR)
        }
    }

    async showJobsPublic(limit: number, page: number){
        try{
            return await this.repositoryJob.showJobsPublic(limit, page)
        }catch(err){
            return DefaultError.messageError("Não foi possível realizar a pesquisa. Tente novamente mais tarde", STATUS_CODE.INTERNAO_SERVER_ERROR)
        }
    }

    async getJobByPagination(limit: number, page: number){
        try{
            return this.repositoryJob.getJobByPagination(limit, page)
        }catch(err){
            return DefaultError.messageError("Não foi possível realizar a pesquisa. Tente novamente mais tarde", STATUS_CODE.INTERNAO_SERVER_ERROR)
        }
    }

}

export { JobService }