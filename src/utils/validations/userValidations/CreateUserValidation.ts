import * as yup from "yup"
import { User } from "../../../app/user/model/User"

class CreateUserValidation {
    static async bodyIsValid(data: User) {
        const createUser = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().required().email(),
            password: yup.string().required()
        })
        try {
            return await createUser.validate(data)
        } catch (err: any) {
            return { error: true }
        }
    }
}

export { CreateUserValidation }