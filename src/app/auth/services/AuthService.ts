import { DefaultError } from "../../../utils/defaultErrors/DefaultError";
import { STATUS_CODE } from "../../../utils/statusCode/StatusCode";
import { UserRepository } from "../../user/repositories/UserRepository";
import { loginUserDto } from "../dtos/loginUserDto";
import { Crypt } from "../../../utils/bcrypt/CryptPassword";
import JWT from "jsonwebtoken"

class AuthService{
    constructor(private repository: UserRepository){}

    async login(data:loginUserDto){
        const userExist = await this.repository.findByEmail(data.email)
        if(!userExist){
            return DefaultError.messageError("Dados para autenticação inválidos", STATUS_CODE.BAD_REQUEST)
        }

        const validatedPasswordUser = Crypt.toCompare(data.password, userExist.password)
        if(!validatedPasswordUser){
            return DefaultError.messageError("Dados para autenticação inválidos", STATUS_CODE.BAD_REQUEST)
        }

        const {_id, name, email, createdAt, updatedAt } = userExist
        const payload = {_id, name, email, createdAt, updatedAt}
        const secretKey = process.env.SECRET_KEY as string
        const options = {expiresIn: "60min"}
        
        const token = JWT.sign(payload, secretKey, options)

        return {token, payload}
    }
}

export { AuthService }