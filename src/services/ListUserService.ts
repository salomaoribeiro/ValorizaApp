import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repository/UsersRepository"
import { classToPlain } from "class-transformer"
import { User } from "../entity/User"

class ListUserService {
  async execute() {
    const userRepository = getCustomRepository(UsersRepository)
    const users = await userRepository.find()
    
    return classToPlain<User>(users)
  }
}

export { ListUserService }