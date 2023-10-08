import bcrypt from "bcrypt"

class Crypt{
    static toEncrypt(password: string){
        return bcrypt.hashSync(password, 8)
    }

    static toCompare(password: string, hash: string){
        return bcrypt.compareSync(password, hash)
    }
}

export {Crypt}