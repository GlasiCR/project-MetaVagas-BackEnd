import { describe, it, vi, expect } from "vitest"
import { TechSearchService } from "./TechSearchService"
import { STATUS_CODE } from "../../../utils/statusCode/StatusCode"
import { DefaultError } from "../../../utils/defaultErrors/DefaultError"

const repositoryMock = { findByNameTech: vi.fn(), sumMostSearchTechJust: vi.fn(), showTechMoreSearch: vi.fn(), showCitiesMoreSearchToTech: vi.fn()}
const sut = new TechSearchService(repositoryMock)

describe("function showCitiesMoreSearchToTech()", () => {
    it("Should return an erros if technology not exists", async () => {
        const paramMockTech = "Nome Tecnologia"
        vi.spyOn(repositoryMock, "findByNameTech").mockReturnValue(false)
        vi.spyOn(repositoryMock, "showCitiesMoreSearchToTech").mockResolvedValue(false)
        
        const result = await sut.showCitiesMoreSearchToTech(paramMockTech)

        expect(result).toStrictEqual(DefaultError.messageError("Não há dados para a pesquisa", STATUS_CODE.NOT_FOUND))
    })

    it("Should return results for search", async () => {
        const paramMockTech = "Nome Tecnologia"
        const expectedReturn = [{_id: "tecnologia", total: 10}]
        vi.spyOn(repositoryMock, "findByNameTech").mockResolvedValue({})
        vi.spyOn(repositoryMock, "showCitiesMoreSearchToTech").mockResolvedValue(expectedReturn)

        const result = await sut.showCitiesMoreSearchToTech(paramMockTech)
        expect(result).toStrictEqual(expectedReturn)
    })

    it("Should return to handle error when doesn't get to search in database", async () => {
        const paramMockTech = "Nome Tecnologia"
        vi.spyOn(repositoryMock, "findByNameTech").mockRejectedValue(new Error("Não foi possível realizar a pesquisa. Tente novamente mais tarde"))

        const result = await sut.showCitiesMoreSearchToTech(paramMockTech)

        expect(result).toStrictEqual(DefaultError.messageError("Não foi possível realizar a pesquisa no momento. Tente novamente mais tarde", STATUS_CODE.INTERNAO_SERVER_ERROR))
    })
})

describe("function showTechMoreSearch()", () => {
    it("Should return results for search", async () => {
        const expectedReturn = {
            _id: "651d6f9af4bf43a3b697ed7e",
            technology: "Javascript",
            location: "Manaus",
            count: 8,
        }
        vi.spyOn(repositoryMock, "showTechMoreSearch").mockResolvedValue(expectedReturn)

        const result = await sut.showTechMoreSearch()
        expect(result).toStrictEqual(expectedReturn)
    })
    
    it("Should return to handle error when doesn't get to search in database", async () => {
        vi.spyOn(repositoryMock, "showTechMoreSearch").mockRejectedValue(new Error("Não foi possível realizar a pesquisa no momento. Tente novamente mais tarde"))

        const result = await sut.showTechMoreSearch()
        expect(result).toStrictEqual(DefaultError.messageError("Não foi possível realizar a pesquisa no momento. Tente novamente mais tarde", STATUS_CODE.INTERNAO_SERVER_ERROR))
    })
})