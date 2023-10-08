import { Router } from "express"
import { JobModules }  from "../app/job/JobModules"
import { AuthMeddleware } from "../middleware/AuthMiddleware"

const jobRoutes = Router()
const { jobController } = JobModules.getInstances()

jobRoutes.post("/", AuthMeddleware.validationToken, jobController.create.bind(jobController))
jobRoutes.get("/", AuthMeddleware.validationToken, jobController.findByFilter.bind(jobController))
jobRoutes.get("/all/", AuthMeddleware.validationToken, jobController.getJobByPagination.bind(jobController))

export { jobRoutes }