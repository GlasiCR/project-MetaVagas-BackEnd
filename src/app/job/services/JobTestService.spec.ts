import{ describe, it, vi, expect } from "vitest"
import { JobService } from "./JobService"
import { STATUS_CODE } from "../../../utils/statusCode/StatusCode"
import { DefaultError } from "../../../utils/defaultErrors/DefaultError"

const repositoryJobMock = { create: vi.fn(), findByFilter: vi.fn(), showJobsPublic: vi.fn(), getJobByPagination: vi.fn() }
const repositoryTechSearchMock = { findByTech: vi.fn() }
const repositoryUser = {}
const sut = new JobService(repositoryJobMock, repositoryTechSearchMock, repositoryUser)

describe("function create()", () => {
    it("Should create a new job", async () => {
        const paramsMock = {
            company: "Nome da Empresa",
            salary: 2.500,
            careerLevel: "Cargo", 
            jobWebsite: "www.meuemprego.com/",
            jobDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            websiteLink: "www.meuemprego.com/vaga",
            location: "Cidade",
            technology: [ "Tecnologia1", "Tecnologia2" ]
        }
        const expectReturn = {
            ...paramsMock,
            createdAt: "2023-09-25T02:38:20.469Z",
            updatedAt: "2023-09-25T02:38:20.469Z",
        }
        vi.spyOn(repositoryJobMock, "create").mockReturnValue(expectReturn)

        const result = await sut.create(paramsMock)

        expect(result).toStrictEqual(expectReturn)
    })

    it("Should return to handle error when doesn't get to create model", async () => {
        const paramsMock = {
            company: "Nome da Empresa",
            salary: 2.500,
            careerLevel: "Cargo", 
            jobWebsite: "www.meuemprego.com/",
            jobDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            websiteLink: "www.meuemprego.com/vaga",
            location: "Cidade",
            technology: [ "Tecnologia1", "Tecnologia2" ]
        }
        vi.spyOn(repositoryJobMock, "create").mockRejectedValue(new Error("Mensagem de erro"))
        const result = await sut.create(paramsMock)
  
        expect(result).toStrictEqual(DefaultError.messageError("Mensagem de erro", STATUS_CODE.INTERNAO_SERVER_ERROR))
    })
})

describe("function findByFilter()", async () => {
    it("Should be able return an error if job not exists", async () => {
        const paramMockId = "1"
        const paramMockObj = { technology: "tecnologia", location: "cidade" } as any
        vi.spyOn(repositoryJobMock, "findByFilter").mockReturnValue([])

        const result = await sut.findByFilter(paramMockId, paramMockObj)

        expect(result).toStrictEqual(DefaultError.messageError("Não há dados para a pesquisa", STATUS_CODE.NOT_FOUND))
    })   
    
    // it("Should return the list of jobs that find the search criteria", async () => {
    //     const paramMockId = "1"
    //     const paramMockObj = { technology: "tecnologia", location: "cidade" }
    //     const paramMockJob = [{id: "1", technology: "tecnologia", location: "cidade"}]
    //     const returnExpected = {
    //         id: "1",
    //         company: "Empresa",
    //         salary: 2500,
    //         careerLevel: "Analista Pleno",
    //         jobWebsite: "www.meuemprego.com/",
    //         jobDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //         websiteLink: "www.meuemprego.com/vaga",
    //         location: "cidade",
    //         createdAt: "2023-09-25T02:33:22.983Z",
    //         updatedAt: "2023-09-25T02:33:22.983Z",
    //         technology: ["tecnologia"],
    //         searchHistory: []
    //     }
    //     vi.spyOn(repositoryJobMock, "findByFilter").mockReturnValue(paramMockJob)
        
    //     const result = await sut.findByFilter(paramMockId, paramMockObj)

    //     expect(result).toStrictEqual(paramMockJob)
    // })

    it("Should return to handle error when doesn't get to search in database", async () => {
        const paramMockId = "1"
        const paramMockObj = {
            technology: "tecnologia",
            location: "cidade"
        } as any
        vi.spyOn(repositoryJobMock, "findByFilter").mockRejectedValue(new Error("Não foi possível realizar a pesquisa, tente novamente mais tarde"))

        const result = await sut.findByFilter(paramMockId, paramMockObj)

        expect(result).toStrictEqual(DefaultError.messageError("Não foi possível realizar a pesquisa, tente novamente mais tarde", STATUS_CODE.INTERNAO_SERVER_ERROR))
    })
})

describe("function showJobsPublic()", async () => {
    it("Should be able to return the list of jobs", async () => {
        const paramMockLimitedByPage = 2
        const paramMockPage = 1
        const returnExpected = {
            id: "1",
            careerLevel: "Nível",
            jobWebsite: "Site de empregos",
            jobDescription: "Descrição da vaga",
            technology: [
                "Tecnologias"
            ]
        }
        vi.spyOn(repositoryJobMock, "showJobsPublic").mockResolvedValue(returnExpected)

        const result = await sut.showJobsPublic(paramMockLimitedByPage, paramMockPage)
        expect(result).toEqual(returnExpected)
    })
    it("Should return to handle error when doesn't get to search in database", async () => {
        const paramMockLimitedByPage = 2
        const paramMockPage = 1
        vi.spyOn(repositoryJobMock, "showJobsPublic").mockRejectedValue(new Error("Não foi possível realizar a pesquisa. Tente novamente mais tarde"))

        const result = await sut.showJobsPublic(paramMockLimitedByPage, paramMockPage)

        expect(result).toStrictEqual(DefaultError.messageError("Não foi possível realizar a pesquisa. Tente novamente mais tarde", STATUS_CODE.INTERNAO_SERVER_ERROR))
    })
})

describe("function getJobByPagination()", async () => {
    it("Should be able to return the list of jobs", async () => {
        const paramMockLimitedByPage = 2
        const paramMockPage = 1
        const returnExpected = {
            "_id": "6510f17207c94b55bf092b7d",
            "company": "Alpha Beta",
            "salary": 3.2,
            "careerLevel": "Analista Pleno",
            "jobWebsite": "www.meuemprego.com/",
            "jobDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            "websiteLink": "www.meuemprego.com/vaga",
            "location": "Maceio",
            "createdAt": "2023-09-25T02:33:22.983Z",
            "updatedAt": "2023-09-25T02:33:22.983Z",
            "technology": []
        }
        vi.spyOn(repositoryJobMock, "getJobByPagination").mockResolvedValue(returnExpected)

        const result = await sut.getJobByPagination(paramMockLimitedByPage, paramMockPage)
        expect(result).toEqual(returnExpected)
    })
    // it("Should return to handle error when doesn't get to search in database", async () => {
    //     const paramMockLimitedByPage = 2
    //     const paramMockPage = 1
    //     vi.spyOn(repositoryJobMock, "getJobByPagination").mockRejectedValue(new Error("Não foi possível realizar a pesquisa. Tente novamente mais tarde"))

    //     const result = await sut.getJobByPagination(paramMockLimitedByPage, paramMockPage)

    //     expect(result).toStrictEqual(DefaultError.messageError("Não foi possível realizar a pesquisa. Tente novamente mais tarde", STATUS_CODE.INTERNAO_SERVER_ERROR))
    // })
})