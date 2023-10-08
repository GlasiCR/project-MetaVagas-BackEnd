import { describe, it, vi, expect } from "vitest"
import { UserService } from "./UserService"
import { DefaultError } from "../../../utils/defaultErrors/DefaultError"
import { STATUS_CODE } from "../../../utils/statusCode/StatusCode"
import { Crypt } from "../../../utils/bcrypt/CryptPassword"

const repositoryMock = { findByEmail: vi.fn(), create: vi.fn(), findById: vi.fn(), update: vi.fn(), includeFavoriteJob: vi.fn(), excludeFavoriteJob: vi.fn(), findByFavoriteJob: vi.fn() }
const repositoryJobMock = { findById: vi.fn() }
const sut = new UserService(repositoryMock, repositoryJobMock)

describe("function create()", () => {
    it("Should return error if user already exists", async () => {
        const paramMock = { name: "Nome do Usuário", email: "email@usuario.com", password: "senhaUsuário" }
        vi.spyOn(repositoryMock, "findByEmail").mockReturnValue({})

        const result = await sut.create(paramMock)

        expect(result).toStrictEqual(DefaultError.messageError("Usuário já existe", STATUS_CODE.CONFLICT))
    })

    it("Should be able create a new user", async () => {
        const paramMock = { name: "Nome do Usuário", email: "email@usuario.com", password: "senhaUsuário" }
        const expectMock = {
            id: "1",
            name: "Nome do Usuário",
            email: "email@usuario.com",
            password: "senhaUsuário",
            createdAt: "2023-09-24T00:57:42.885Z",
            updatedAt: "2023-09-24T00:57:42.885Z"
        }
        vi.spyOn(repositoryMock, "findByEmail").mockReturnValue(false)
        vi.spyOn(repositoryMock, "create").mockReturnValue(expectMock)
        vi.spyOn(Crypt, "toEncrypt").mockReturnValue("senha criptografada")

        const result = await sut.create(paramMock)

        expect(result).toStrictEqual(expectMock)
    })
})

describe("function update()", () => {
    it("Should return error if user not exists", async () => {
        const paramMockId = { id: "1" }
        const paramMockData = { name: "Nome do Usuário", email: "email@usuario.com", password: "senhaUsuário" }
        vi.spyOn(repositoryMock, "findById").mockReturnValue(null)

        const result = await sut.update(paramMockId as any as string, paramMockData)

        expect(result).toStrictEqual(DefaultError.messageError("Usuário não encontrado", STATUS_CODE.NOT_FOUND))
    })

    // it("Should be able to update data", async () => {
    //     const paramMockId = {id: "1"}
    //     const paramMockData = {name: "Nome do Usuário", email: "email@usuario.com", password: "senhaUsuário"}
    //     vi.spyOn(repositoryMock, "findById").mockResolvedValue(true)
    //     vi.spyOn(Crypt, "toEncrypt").mockReturnValue("senha criptografada") 

    //     const result = await sut.update(paramMockId as any as string, paramMockData)
    //     const expected = {name: "Nome do Usuário", email: "email@usuario.com", password: "senha criptografada"}

    //     expect(result).toStrictEqual(expected)
    // })

    it("Should return to handle error when doesn't get to update data", async () => {
        const paramMockId = { id: "1" }
        const paramMockData = { name: "Nome do Usuário", email: "email@usuario.com", password: "senhaUsuário" }
        const returnError = "Lamentamos, mas parece que estamos enfrentando um problema temporário em nosso servidor. Fique tranquilo, nossa equipe já está trabalhando para resolver isso. Infelizmente, não pudemos registrar sua solicitação desta vez. Por favor, tente novamente mais tarde."
        vi.spyOn(repositoryMock, "findById").mockReturnValue(true)
        vi.spyOn(repositoryMock, "update").mockRejectedValue(returnError)

        const result = await sut.update(paramMockId as any as string, paramMockData)

        expect(result).toStrictEqual(DefaultError.messageError(returnError, STATUS_CODE.INTERNAO_SERVER_ERROR))
    })
})

describe("function includeAndExcludeFavoriteJob()", () => {
    it("Should return an error if user not exist", async () => {
        const paramMock = { idUser: "1", idJob: "2" }
        vi.spyOn(repositoryMock, "findById").mockReturnValue(false)

        const result = await sut.includeAndExcludeFavoriteJob(paramMock)

        expect(result).toStrictEqual(DefaultError.messageError("Usuário não existe", STATUS_CODE.NOT_FOUND))
    })

    it("Should return an error if job not exist in the database", async () => {
        const paramMock = { idUser: "1", idJob: "2" }
        vi.spyOn(repositoryMock, "findById").mockReturnValue({})
        vi.spyOn(repositoryJobMock, "findById").mockReturnValue(false)

        const result = await sut.includeAndExcludeFavoriteJob(paramMock)

        expect(result).toStrictEqual(DefaultError.messageError("Vaga não existe", STATUS_CODE.NOT_FOUND))
    })
    it("Should be able to include the job as the user's favorites", async () => {
        const paramMock = { idUser: "1", idJob: "2" }
        const expected = {
            id: "1",
            name: "Nome do Usuário",
            email: "email@usuario.com",
            password: "senhaUsuário",
            createdAt: "2023-09-24T00:33:11.137Z",
            updatedAt: "2023-09-30T01:27:44.582Z",
            jobFavorite: [{ idJob: "2" }]
        }
        vi.spyOn(repositoryMock, "findById").mockReturnValue({})
        vi.spyOn(repositoryJobMock, "findById").mockReturnValue({})
        vi.spyOn(repositoryMock, "includeFavoriteJob").mockReturnValue(expected)

        const result = await sut.includeAndExcludeFavoriteJob(paramMock)
 
        expect(result).toStrictEqual(expected)
    })

    it("Should be able to include the job as the user's favorites", async () => {
        const paramMock = { idUser: "1", idJob: "2" }
        const expected = {
            id: "1",
            name: "Nome do Usuário",
            email: "email@usuario.com",
            password: "senhaUsuário",
            createdAt: "2023-09-24T00:33:11.137Z",
            updatedAt: "2023-09-30T01:27:44.582Z",
            jobFavorite: [{ idJob: "2" }]
        }
        
        vi.spyOn(repositoryMock, "findById").mockReturnValue({})
        vi.spyOn(repositoryJobMock, "findById").mockReturnValue({})
        vi.spyOn(repositoryMock, "findByFavoriteJob").mockReturnValue(false)
        vi.spyOn(repositoryMock, "includeFavoriteJob").mockReturnValue(expected)

        const result = await sut.includeAndExcludeFavoriteJob(paramMock)
 
        expect(result).toStrictEqual(expected)
    })

    it("Should return to handle with a throw new error in includeAndExcludeFavoriteJob", async () => {
        const paramMock = { idUser: "1", idJob: "2" }
        const returnError = "Lamentamos, mas parece que estamos enfrentando um problema temporário em nosso servidor. Fique tranquilo, nossa equipe já está trabalhando para resolver isso. Infelizmente, não pudemos registrar sua solicitação desta vez. Por favor, tente novamente mais tarde."
        vi.spyOn(repositoryMock, "findById").mockReturnValue({})
        vi.spyOn(repositoryJobMock, "findById").mockReturnValue({})
        vi.spyOn(repositoryMock, "includeFavoriteJob").mockRejectedValue(returnError)

        const result = await sut.includeAndExcludeFavoriteJob(paramMock)

        expect(result).toStrictEqual(DefaultError.messageError(returnError, STATUS_CODE.INTERNAO_SERVER_ERROR))
    })
})

// describe("function excludeFavoriteJob()", () => {
//     it("Should return an error if user not exist", async () => {
//         const paramMock = { idUser: "1", idJob: "2" }
//         vi.spyOn(repositoryMock, "findById").mockReturnValue(false)

//         const result = await sut.includeAndExcludeFavoriteJob(paramMock)

//         expect(result).toStrictEqual(DefaultError.messageError("Usuário não existe", STATUS_CODE.NOT_FOUND))
//     })

//     it("Should return an error if job not exist", async () => {
//         const paramMock = { idUser: "1", idJob: "2" }
//         vi.spyOn(repositoryMock, "findById").mockReturnValue({})
//         vi.spyOn(repositoryJobMock, "findById").mockReturnValue(false)

//         const result = await sut.excludeFavoriteJob(paramMock)

//         expect(result).toStrictEqual(DefaultError.messageError("Vaga não existe", STATUS_CODE.NOT_FOUND))
//     })

//     it("Should be able to exclude the job as the user's favorites", async () => {
//         const paramMock = { idUser: "1", idJob: "2" }
//         const expected = {
//             id: "1",
//             name: "Nome do Usuário",
//             email: "email@usuario.com",
//             password: "senhaUsuário",
//             createdAt: "2023-09-24T00:33:11.137Z",
//             updatedAt: "2023-09-30T01:27:44.582Z",
//             jobFavorite: [{ idJob: "2" }]
//         }
        
//         vi.spyOn(repositoryMock, "findById").mockReturnValue({})
//         vi.spyOn(repositoryJobMock, "findById").mockReturnValue({})
//         vi.spyOn(repositoryMock, "excludeFavoriteJob").mockReturnValue(expected)

//         const result = await sut.excludeFavoriteJob(paramMock)
 
//         expect(result).toStrictEqual(expected)
//     })

//     it("Should return to handle with a throw new error in excludeFavoriteJob", async () => {
//         const paramMock = { idUser: "1", idJob: "2" }
//         const returnError = "Lamentamos, mas parece que estamos enfrentando um problema temporário em nosso servidor. Fique tranquilo, nossa equipe já está trabalhando para resolver isso. Infelizmente, não pudemos registrar sua solicitação desta vez. Por favor, tente novamente mais tarde."
//         vi.spyOn(repositoryMock, "findById").mockReturnValue({})
//         vi.spyOn(repositoryJobMock, "findById").mockReturnValue({})
//         vi.spyOn(repositoryMock, "excludeFavoriteJob").mockRejectedValue(returnError)

//         const result = await sut.excludeFavoriteJob(paramMock)

//         expect(result).toStrictEqual(DefaultError.messageError(returnError, STATUS_CODE.INTERNAO_SERVER_ERROR))
//     })
//})