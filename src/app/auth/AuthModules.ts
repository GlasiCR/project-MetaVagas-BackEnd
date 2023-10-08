import { UserRepository } from "../user/repositories/UserRepository"
import { User } from "../user/model/User"
import { AuthService } from "./services/AuthService"
import { AuthController} from "./controllers/AuthController"

class AuthModules{
    static getInstances(){
        const userRepository = new UserRepository(User)
        const authService = new AuthService(userRepository)
        const authController = new AuthController(authService)

        return {authController}
    }
}

export { AuthModules }