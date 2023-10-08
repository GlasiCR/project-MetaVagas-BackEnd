import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { STATUS_CODE } from "../../../utils/statusCode/StatusCode";
import { DefaultError } from "../../../utils/defaultErrors/DefaultError";
import { loginUserValidation } from "../../../utils/validations/authValidations/loginUserValidation";

class AuthController{
    constructor(private service: AuthService){}

    async login (req: Request, res: Response){
        const { body } = req
        const validatedUser = await loginUserValidation.loginIsValid(body)
        if('error' in validatedUser){
            return res.status(STATUS_CODE.BAD_REQUEST).json(DefaultError.messageError("Dados para autenticação inválidos", STATUS_CODE.BAD_REQUEST))
        }

        const result = await this.service.login(body)

        if('error' in result){
            return res.status(STATUS_CODE.UNAUTHORIZED).json(DefaultError.messageError("Não autorizado", STATUS_CODE.UNAUTHORIZED))
        }

        return res.status(STATUS_CODE.OK).json(result)
    }
}

export { AuthController }