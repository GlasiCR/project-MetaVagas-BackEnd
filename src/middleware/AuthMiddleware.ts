import { NextFunction, Request, Response } from "express";
import { STATUS_CODE } from "../utils/statusCode/StatusCode";
import { DefaultError } from "../utils/defaultErrors/DefaultError";
import JWT from "jsonwebtoken"

class AuthMeddleware{
    static async validationToken(req: Request, res: Response, next: NextFunction){
        const { headers } = req
        if(!headers.authorization){
            return res.status(STATUS_CODE.UNAUTHORIZED).json(DefaultError.messageError("Usuário não autorizado", STATUS_CODE.UNAUTHORIZED))
        }
        const [, token] = headers.authorization.split(" ")

        try{
            JWT.verify(token, process.env.SECRET_KEY as string)
        }catch{
            return res.status(STATUS_CODE.UNAUTHORIZED).json(DefaultError.messageError("Usuário não autorizado", STATUS_CODE.UNAUTHORIZED))
        }
        next()
    }
}

export { AuthMeddleware }