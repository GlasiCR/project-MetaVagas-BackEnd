import * as yup from "yup"
import { Request, Response } from "express";
import { CreateJobValidation } from "../../../utils/validations/jobValidations/CreateJobValidation";
import { STATUS_CODE } from "../../../utils/statusCode/StatusCode";
import { DefaultError } from "../../../utils/defaultErrors/DefaultError";
import { PaginationValidation } from "../../../utils/validations/paginationValidation/PaginationValidation";

class JobController{
    constructor(private service: any){}

    async create(req: Request, res: Response){
        const { body } = req
        
        const bodyCreateJobIsValid = await CreateJobValidation.bodyIsValid(body)
        if('error' in bodyCreateJobIsValid){
            return res.status(STATUS_CODE.BAD_REQUEST).json(DefaultError.messageError("Dados inválidos", STATUS_CODE.BAD_REQUEST))
        }

        const result = await this.service.create(body)
        if('error' in result){
            return res.status(STATUS_CODE.BAD_REQUEST).json(DefaultError.messageError("Lamentamos, mas parece que estamos enfrentando um problema temporário em nosso servidor. Fique tranquilo, nossa equipe já está trabalhando para resolver isso. Infelizmente, não pudemos registrar sua solicitação desta vez. Por favor, tente novamente mais tarde.", STATUS_CODE.INTERNAO_SERVER_ERROR))
        }

        return res.status(STATUS_CODE.CREATED).json(result)
    }

    async findByFilter(req: Request, res: Response){
            const { query, body } = req
            const result = await this.service.findByFilter(body.idUser, query)
            return res.status(STATUS_CODE.OK).json(result)
    }

    async findByFilterNotLogged(req: Request, res: Response){
        const { query } = req
        const result = await this.service.findByFilterNotLogged(query)
        return res.status(STATUS_CODE.OK).json(result)
}

    async showJobsPublic(req: Request, res: Response){
        const { query } = req
        const result = await this.service.showJobsPublic(query.itensPage, query.page)
        return res.status(STATUS_CODE.OK).json(result)       
    }

    async getJobByPagination(req:Request, res: Response){
        const { query } = req

        const result = await this.service.getJobByPagination(query.itensPage, query.page);
        return res.status(200).json(result)
        
    }
}
export{ JobController }