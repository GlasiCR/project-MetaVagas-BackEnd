import { Router } from "express"
import { UserModules } from "../app/user/UserModules"
import { AuthMeddleware } from "../middleware/AuthMiddleware"

const userRoutes = Router()
const { userController } = UserModules.getInstances()

userRoutes.post("/", userController.create.bind(userController))
userRoutes.post("/:id/profile", AuthMeddleware.validationToken, userController.update.bind(userController))
userRoutes.post("/jobfavorite/", AuthMeddleware.validationToken, userController.includeAndExcludeFavoriteJob.bind(userController))
userRoutes.get("/history/:id", AuthMeddleware.validationToken, userController.showHistory.bind(userController))

export { userRoutes }