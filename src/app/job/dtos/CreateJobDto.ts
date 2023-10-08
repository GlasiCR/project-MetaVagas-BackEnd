export interface CreateJobDto {
  company: string,
  salary: number,
  careerLevel: string,
  jobWebsite: string,
  jobDescription: string,
  websiteLink?: string,
  location: string,
  technology: string[],
  jobType?: string,
  workArrangement?: string,
  companySize?: string,
  levelExperience?: string
}

export interface JobDto {
  _id?: string
  company?: string,
  salary?: number,
  careerLevel?: string,
  jobWebsite?: string,
  jobDescription?: string,
  websiteLink?: string,
  location?: string,
  createdAt?: Date,
  updatedAt?: Date,
  technology?: string[],
  jobType?: string,
  workArrangement?: string,
  companySize?: string,
  levelExperience?: string
}