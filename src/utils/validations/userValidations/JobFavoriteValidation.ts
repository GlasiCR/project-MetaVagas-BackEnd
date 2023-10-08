import * as yup from "yup"
import { User } from "../../../app/user/model/User"

class JobFavoriteValidation {
    static async bodyIsValid(data: User) {
        const includeJobFavorite = yup.object().shape({
            idUser: yup.string().required(),
            idJob: yup.string().required(),
        })
        try {
            return await includeJobFavorite.validate(data)
        } catch (err: any) {
            return { error: true }
        }
    }
}

export { JobFavoriteValidation }