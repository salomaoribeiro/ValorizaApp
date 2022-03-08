import { NextFunction, Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repository/UsersRepository"

async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const { user_id } = request

  const userRepository = getCustomRepository(UsersRepository)
  const { admin } = await userRepository.findOne(user_id)
  
  // Verificar se usuário é admin
  if ( admin) {
    return next()
  }
  return response.status(401).json({
    "error": "Unauthorized"
  })
}

export { ensureAdmin }