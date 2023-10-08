import { Router } from "express"
import { AuthModules } from "../app/auth/AuthModules"

const authRoutes = Router()
const { authController } = AuthModules.getInstances()

authRoutes.post("/", authController.login.bind(authController))

export { authRoutes }
