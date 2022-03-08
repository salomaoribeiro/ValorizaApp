import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repository/UsersRepository"
import { compare } from "bcryptjs" 
import { sign } from "jsonwebtoken"

interface IAutenticateRequest {
  email: string
  password: string
}

class AuthenticateUserService {
  async execute({ email, password} : IAutenticateRequest) {

      const usersRepository = getCustomRepository(UsersRepository)

      // Verificar se email existe
      const user = await usersRepository.findOne({ email })

      if (!user) {
        throw new Error("Email/Password incorrect email")
      }
      
      // Verificar se senha está correta
      const passwordCompared = await compare(password, user.password)
      if (!passwordCompared) {
        console.log(user);
        
        throw new Error("Email/Password incorrect senha")
      }

      // Gerar token
      const token = sign({
        email: user.email
      }, 
      "f4849dc7d3a921154a97e4a3474d02f5", {
        subject: user.id,
        expiresIn: "1d"
      })

      return token
  }
}

export { AuthenticateUserService}