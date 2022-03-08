import { getCustomRepository } from "typeorm"
import { ComplimentsRepository } from "../repository/ComplimentsRepository"
import { UsersRepository } from "../repository/UsersRepository"


interface IComplimentRequest {
  user_sender: string
  user_receiver: string
  tag_id: string
  message: string
}

class CreateComplimentService {
  async execute({ user_sender, user_receiver, tag_id, message } : IComplimentRequest) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository)
    const usersRepositories = getCustomRepository(UsersRepository)
    
    if (user_sender === user_receiver) {
      throw new Error("Incorrect User Receiver")
    }
    const userReceiverExists = await usersRepositories.findOne(user_receiver)
    if (!userReceiverExists) {
      throw new Error("User Receiver does not exists")
    }

    const compliment = complimentsRepository.create({
      user_sender,
      user_receiver,
      tag_id,
      message
    })

    await complimentsRepository.save(compliment)
    
    return compliment
  }
}

export { CreateComplimentService }