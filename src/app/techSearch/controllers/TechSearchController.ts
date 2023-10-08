import { Request, Response } from "express"
import { STATUS_CODE } from "../../../utils/statusCode/StatusCode"

class TechSearchController {
    constructor(private service: any) {}
    
    async showTechMoreSearch(req: Request, res: Response){
        const result = await this.service.showTechMoreSearch()
        return res.status(STATUS_CODE.OK).json(result)
    }
    
    async showCitiesMoreSearchToTech(req: Request, res: Response){
        const { params } = req
        const result = await this.service.showCitiesMoreSearchToTech(params.tech)
        return res.status(STATUS_CODE.OK).json(result)
    }
}

export { TechSearchController }