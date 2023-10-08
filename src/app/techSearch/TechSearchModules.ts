import { TechSearchRepository } from "./repositories/TechSearchRepository"
import { TechSearch } from "./model/TechSearch"
import { TechSearchService } from "./services/TechSearchService"
import { TechSearchController } from "./controllers/TechSearchController"

class TechSearchModules{
    static getInstances(){
        const techSearchRepository = new TechSearchRepository(TechSearch)
        const techSearchService = new TechSearchService (techSearchRepository)
        const techSearchController = new TechSearchController(techSearchService)

        return {techSearchController}
    }
}

export { TechSearchModules }