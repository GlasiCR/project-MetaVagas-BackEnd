//repositories
import { UserRepository } from "./repositories/UserRepository"
import { JobRepository } from "../job/repositories/JobRepository"
//models
import { User } from "./model/User"
import { Job } from "../job/model/Job"
import { History } from "../history/model/History"
//services
import { UserService } from "./services/UserService"
//controllers
import { UserController} from "./controllers/UserController"



class UserModules{
    static getInstances(){
        const userRepository = new UserRepository(User, History)
        const jobRepository = new JobRepository(Job)
        const userService = new UserService(userRepository, jobRepository)
        const userController = new UserController(userService)

        return {userController}
    }
}

export { UserModules }