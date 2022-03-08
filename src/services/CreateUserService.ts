import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repository/UsersRepository"
import { hash } from "bcryptjs"

interface IUserRequest {
  name: string
  password: string
  email: string
  admin?: boolean
}

class CreateUserService {
  
  async execute({ name, password, email, admin = false } : IUserRequest) {
     const usersRepository = getCustomRepository(UsersRepository)

     if(!email) {
       throw new Error("E-mail incorrect")
     }

     const userAlreadExists = await usersRepository.findOne({
       email
     })
     if (userAlreadExists){
       throw new Error("User alread exists")
     }

     const passwordHash = await hash(password, 8)

     const user = usersRepository.create({
       name,
       password: passwordHash,
       email,
       admin
     })
     await usersRepository.save(user)
     return user

  }
}

export { CreateUserService }