import { getCustomRepository } from "typeorm"
import { ComplimentsRepository } from "../repository/ComplimentsRepository"

class ListUserSendComplimentsService {
  async execute(user_id){
    const complimentsRepository = getCustomRepository(ComplimentsRepository)
    const compliments = complimentsRepository.find({
      where: {
        user_sender: user_id
      },
      relations: ["userSender", "userReceiver", "tag"]
    })
    return compliments
  }
}

export { ListUserSendComplimentsService }