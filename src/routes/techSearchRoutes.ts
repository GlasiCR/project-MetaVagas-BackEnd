import { Router } from "express"
import { TechSearchModules }  from "../app/techSearch/TechSearchModules"
import { AuthMeddleware } from "../middleware/AuthMiddleware"

const techSearchRoutes = Router()
const { techSearchController } = TechSearchModules.getInstances()

techSearchRoutes.get("/", AuthMeddleware.validationToken, techSearchController.showTechMoreSearch.bind(techSearchController))
techSearchRoutes.get("/:tech/", AuthMeddleware.validationToken, techSearchController.showCitiesMoreSearchToTech.bind(techSearchController))

export { techSearchRoutes }