import { JobRepository } from "./repositories/JobRepository"
import { TechSearchRepository } from "../techSearch/repositories/TechSearchRepository"
import { UserRepository } from "../user/repositories/UserRepository"

import { Job } from "./model/Job"
import { TechSearch } from "../techSearch/model/TechSearch"
import { User } from "../user/model/User"

import { JobService } from "./services/JobService"

import { JobController} from "./controllers/JobController"

class JobModules{
    static getInstances(){
        const jobRepository = new JobRepository(Job)
        const repositoryTechSearch = new TechSearchRepository(TechSearch)
        const repositoryUser = new UserRepository(User)
        const jobService = new JobService(jobRepository, repositoryTechSearch, repositoryUser)
        const jobController = new JobController(jobService)

        return { jobController, jobService }
    }
}

export { JobModules }