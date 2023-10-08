import { loginUserDto } from "../../../app/auth/dtos/loginUserDto";
import * as yup from "yup"

class loginUserValidation{
    static async loginIsValid(data: loginUserDto){
        const authUser = yup.object().shape({
            email: yup.string().required(),
            password: yup.string().required()
        })

        try{
            return await authUser.validate(data)
        } catch(err: any){
            return {error: true}
        }
    }
}

export { loginUserValidation }