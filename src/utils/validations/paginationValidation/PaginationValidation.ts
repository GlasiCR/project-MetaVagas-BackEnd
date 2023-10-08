import * as yup from "yup"

class PaginationValidation {
    static async isValid(data: any) {
        const paginationValidation = yup.object().shape({
            page: yup.number().integer().positive().required(),
            limit: yup.number().integer().positive().required(),
        })
        try {
            return await paginationValidation.validate(data)
        } catch (err: any) {
            return { error: true }
        }
    }
}

export { PaginationValidation }