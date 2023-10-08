import { describe, it, vi, expect, beforeEach } from "vitest";
import { AuthService } from "./AuthService";
import { STATUS_CODE } from "../../../utils/statusCode/StatusCode";
import { Crypt } from "../../../utils/bcrypt/CryptPassword";
import { DefaultError } from "../../../utils/defaultErrors/DefaultError";
import JWT from "jsonwebtoken"
import { UserRepository } from "../../user/repositories/UserRepository";

const repositoryMock = { findByEmail: vi.fn() } as any as UserRepository
const sut = new AuthService(repositoryMock)

describe("function login()", ()=> {
    
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("Should return an error if email not exists", async () => {
        const paramMock = {email: "email@usuario.com", password: "senhaUsuário"}
        vi.spyOn(repositoryMock, "findByEmail").mockResolvedValue(false)
        
        const result = await sut.login(paramMock)
        expect(result).toStrictEqual(DefaultError.messageError("Dados para autenticação inválidos", STATUS_CODE.BAD_REQUEST))
    })

    it("Should return an error if password invalid", async () => {
        const paramMock = {email: "email@usuario.com", password: "senhaUsuário"}
        vi.spyOn(repositoryMock, "findByEmail").mockResolvedValue({})
        vi.spyOn(Crypt, "toCompare").mockReturnValue(false)

        const result = await sut.login(paramMock)

        expect(result).toStrictEqual(DefaultError.messageError("Dados para autenticação inválidos", STATUS_CODE.BAD_REQUEST))
    })

    it("Should return the user's token and user", async () => {
        const paramMock = {email: "email@usuario.com", password: "senhaUsuário"}
        const userMock = {
            _id: "1", 
            name: "Nome do Usuário", 
            email: "email@usuario.com", 
            password: "senhaUsuário",
            createdAt: "2023-09-24T00:57:42.885Z",
            updatedAt: "2023-09-24T00:57:42.885Z"
        }
        vi.spyOn(repositoryMock, "findByEmail").mockResolvedValue(userMock)
        vi.spyOn(Crypt, "toCompare").mockReturnValue(true)
        vi.spyOn(JWT, "sign").mockReturnValue("mcvldsmvpoewçv" as any)
        
        const result = await sut.login(paramMock)

        const expectUser = { 
            payload: {
                _id: "1",
                name: "Nome do Usuário", 
                email: "email@usuario.com",
                createdAt: "2023-09-24T00:57:42.885Z",
                updatedAt: "2023-09-24T00:57:42.885Z"
            },
            token: "mcvldsmvpoewçv",
        }       
        expect(result).toStrictEqual(expectUser)
    })
})