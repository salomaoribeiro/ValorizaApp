import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
  sub: string
}

function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  // Receber o token
  const authToken = request.headers.authorization

  
  // Validar se o token está preenchido
  if (!authToken) {
    return response.status(401).end()
  }

  // Validar se o token é válido (não está expirado)
  const [, token] = authToken.split(" ")
  
  try {
    const { sub } = verify(token, "f4849dc7d3a921154a97e4a3474d02f5") as IPayload
    
    // Recuperar informações do usuário
    request.user_id = sub
    return next()

  } catch (error) {
    return response.status(401).end()
  }  
}

export { ensureAuthenticated }