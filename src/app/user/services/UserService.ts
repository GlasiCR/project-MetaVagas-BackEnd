import { Crypt } from "../../../utils/bcrypt/CryptPassword";
import { DefaultError } from "../../../utils/defaultErrors/DefaultError";
import { STATUS_CODE } from "../../../utils/statusCode/StatusCode";
import { UserDto } from "../dtos/UserDto";

class UserService {
    constructor(
        private repository: any,
        private repositoryJob: any,
    ) { }

    async create(user: UserDto) {
        const userAlready = await this.repository.findByEmail(user.email)
        if (userAlready) {
            return DefaultError.messageError("Usuário já existe", STATUS_CODE.CONFLICT)
        }
        const newUser = {
            ...user,
            password: Crypt.toEncrypt(user.password as string)
        }
        return this.repository.create(newUser)
    }

    async update(id: string, user: UserDto) {
        try {
            const userAlready = await this.repository.findById(id)
            if (!userAlready) {
                return DefaultError.messageError("Usuário não encontrado", STATUS_CODE.NOT_FOUND)
            }
            const userUpdated = {
                name: user.name,
                email: user.email,
                password: Crypt.toEncrypt(user.password as string)
            }

            return await this.repository.update(id, userUpdated)

        } catch (err: any) {
            return DefaultError.messageError("Lamentamos, mas parece que estamos enfrentando um problema temporário em nosso servidor. Fique tranquilo, nossa equipe já está trabalhando para resolver isso. Infelizmente, não pudemos registrar sua solicitação desta vez. Por favor, tente novamente mais tarde.", STATUS_CODE.INTERNAO_SERVER_ERROR)
        }
    }

    async includeAndExcludeFavoriteJob(data: any) {
        try {
            const userAlready = await this.repository.findById(data.idUser)
            if (!userAlready) {
                return DefaultError.messageError("Usuário não existe", STATUS_CODE.NOT_FOUND)
            }
            
            const jobAlready = await this.repositoryJob.findById(data.idJob)
            if (!jobAlready) {
                return DefaultError.messageError("Vaga não existe", STATUS_CODE.NOT_FOUND)
            }

            const jobAlreadyFavorite = await this.repository.findByFavoriteJob(jobAlready)
            if(jobAlreadyFavorite){
                return this.repository.excludeFavoriteJob(data.idUser, jobAlready)
            }
            return await this.repository.includeFavoriteJob(data, jobAlready)
        } catch (err) {
            return DefaultError.messageError("Lamentamos, mas parece que estamos enfrentando um problema temporário em nosso servidor. Fique tranquilo, nossa equipe já está trabalhando para resolver isso. Infelizmente, não pudemos registrar sua solicitação desta vez. Por favor, tente novamente mais tarde.", STATUS_CODE.INTERNAO_SERVER_ERROR)
        }
    }

    async showHistory(idUser: string){
        return this.repository.showHistory(idUser)
    }
}

export { UserService }