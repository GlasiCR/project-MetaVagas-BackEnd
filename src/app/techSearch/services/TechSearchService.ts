import { DefaultError } from "../../../utils/defaultErrors/DefaultError"
import { STATUS_CODE } from "../../../utils/statusCode/StatusCode"

class TechSearchService{
    constructor(private repository: any){}

    async showTechMoreSearch(){
        try{
            return await this.repository.showTechMoreSearch()
        }catch(err: any){
            return DefaultError.messageError("Não foi possível realizar a pesquisa no momento. Tente novamente mais tarde", STATUS_CODE.INTERNAO_SERVER_ERROR)   
        }
    }
    async showCitiesMoreSearchToTech(nameTech: string){
        try{
            const techAlready = await this.repository.findByNameTech(nameTech)
            if(!techAlready){
                return DefaultError.messageError("Não há dados para a pesquisa", STATUS_CODE.NOT_FOUND)
            }
            
            return await this.repository.showCitiesMoreSearchToTech(nameTech)
        } catch(err: any){
            return DefaultError.messageError("Não foi possível realizar a pesquisa no momento. Tente novamente mais tarde", STATUS_CODE.INTERNAO_SERVER_ERROR)
        }
    }
}

export { TechSearchService }