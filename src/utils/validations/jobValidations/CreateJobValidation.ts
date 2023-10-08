import * as yup from "yup"
import { Job } from "../../../app/job/model/Job"

class CreateJobValidation{
    static async bodyIsValid(data: Job){
        const createJob = yup.object().shape({
            company: yup.string().required(),
            salary: yup.number().required(),
            careerLevel: yup.string().required(), 
            jobWebsite: yup.string().required(),
            jobDescription: yup.string().required(),
            websiteLink: yup.string().required(),
            location: yup.string().required(),
            technology: yup.array().of(yup.string()).required(),
            jobType: yup.string(),
            workArrangement: yup.string(),
            companySize: yup.string(),
            levelExperience: yup.string(),
        })
        try {
            return await createJob.validate(data)
        } catch (err: any) {
            return { error: true }
        }
    }
}

export { CreateJobValidation } 