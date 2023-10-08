import * as yup from "yup"
import { UserDto } from "../../../app/user/dtos/UserDto";
import { DefaultError } from "../../defaultErrors/DefaultError";
import { STATUS_CODE } from "../../statusCode/StatusCode";

class UpdateUserValidation{
    static async bodyIsValid(data: UserDto){
        const updateUser = yup.object().shape({
            name: yup.string(),
            email: yup.string(),
            password: yup.string(),
        })
        try{
            return await updateUser.validate(data)
        }catch(err: any){
            return DefaultError.messageError(err.message, STATUS_CODE.INTERNAO_SERVER_ERROR)
        }
    }
}

export { UpdateUserValidation }