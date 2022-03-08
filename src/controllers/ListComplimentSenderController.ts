import { Request, Response } from "express";
import { ListUserSendComplimentsService } from "../services/ListUserSendComplimentsService";

class ListUserSendComplimentController {
  async handle( request: Request, response: Response) {
    const { user_id } = request

    const listUserSendComplimentsController = new ListUserSendComplimentsService()
    const sendCompliments = await listUserSendComplimentsController.execute(user_id)
    
    return response.json(sendCompliments)
  }
}

export { ListUserSendComplimentController }