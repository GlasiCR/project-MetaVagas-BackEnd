import { Request, Response } from "express";
import { UserService } from "../services/UserService";
//utils
import { STATUS_CODE } from "../../../utils/statusCode/StatusCode";
import { DefaultError } from "../../../utils/defaultErrors/DefaultError";
//validations
import { CreateUserValidation } from "../../../utils/validations/userValidations/CreateUserValidation";
import { UpdateUserValidation } from "../../../utils/validations/userValidations/UpdateUserValidation";
import { JobFavoriteValidation } from "../../../utils/validations/userValidations/JobFavoriteValidation";

class UserController{
    constructor(private service: UserService){}

    async create(req: Request, res: Response){
        const { body } = req

        const bodyCreateUserIsValid = await CreateUserValidation.bodyIsValid(body)
        if('error' in bodyCreateUserIsValid){
            return res.status(STATUS_CODE.BAD_REQUEST).json(DefaultError.messageError("Dados inválidos", STATUS_CODE.BAD_REQUEST))
        }
        const result = await this.service.create(body)

        if('error' in result){
            return res.status(STATUS_CODE.CONFLICT).json(DefaultError.messageError("Usuário já existe", STATUS_CODE.CONFLICT))
        }
        return res.status(STATUS_CODE.CREATED).json(result)
    }

    async update(req: Request, res: Response){
        const { body, params: {id} } = req
        
        const updateUserValidation = UpdateUserValidation.bodyIsValid(body)
        if('error' in updateUserValidation){
            return res.status(STATUS_CODE.BAD_REQUEST).json(DefaultError.messageError("Dados inválidos", STATUS_CODE.BAD_REQUEST))
        }
        const result = await this.service.update(id, body)

        if('error' in result){
            return res.status(STATUS_CODE.BAD_REQUEST).json(DefaultError.messageError("Não foi possível realizar a atualização. Tente novamente mais tarde", STATUS_CODE.BAD_REQUEST))
        }

        return res.status(STATUS_CODE.OK).json("Atualização realizada com sucesso")
   }

   async includeAndExcludeFavoriteJob(req: Request, res: Response){
        const { body } = req

        const bodyValidated = JobFavoriteValidation.bodyIsValid(body)
        if('error' in bodyValidated){
            return res.status(STATUS_CODE.BAD_REQUEST).json(DefaultError.messageError("Dados inválidos", STATUS_CODE.BAD_REQUEST))
        }
        const result = await this.service.includeAndExcludeFavoriteJob(body)
        if('error' in result){
            return res.status(STATUS_CODE.BAD_REQUEST).json(DefaultError.messageError("Não foi possível atender sua requisição. Tente novamente mais tarde", STATUS_CODE.BAD_REQUEST))
        }
              
        return res.status(STATUS_CODE.OK).json(result.jobFavorite || "Vaga desfavoritada com sucesso")
   }

   async showHistory(req: Request, res: Response){
    const { params } = req
    const result = await this.service.showHistory(params.id)

    return res.status(200).json(result)
   }
}

export { UserController }