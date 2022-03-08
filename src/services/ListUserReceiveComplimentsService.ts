import { getCustomRepository } from "typeorm"
import { ComplimentsRepository } from "../repository/ComplimentsRepository"

class ListUserReceiveComplimentsService {
  async execute(user_id){
    const complimentsRepository = getCustomRepository(ComplimentsRepository)
    const compliments = await complimentsRepository.find({
      where: {
        user_receiver: user_id
      },
      relations: ["userSender", "userReceiver", "tag"]
    })
    return compliments
  }
}

export { ListUserReceiveComplimentsService }