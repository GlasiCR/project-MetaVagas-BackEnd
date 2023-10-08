import { Router } from "express"
import { userRoutes } from "./userRoutes"
import { authRoutes } from "./authRoutes"
import { jobRoutes } from "./jobRoutes"
import { techSearchRoutes} from "./techSearchRoutes"
import { JobModules }  from "../app/job/JobModules"

const routes = Router()
const { jobController } = JobModules.getInstances()

routes.use("/users", userRoutes)
routes.use("/login", authRoutes)
routes.use("/jobs", jobRoutes)
routes.use("/tendencies", techSearchRoutes)

routes.use("/", jobController.findByFilterNotLogged.bind(jobController))
routes.get("/allJobs/", jobController.showJobsPublic.bind(jobController))

export { routes }