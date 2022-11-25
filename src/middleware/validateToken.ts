import { TokenServices } from './../utils/JWT/TokenServices'
import 'dotenv/config'
import { NextFunction, Request, Response } from 'express'
import { UnauthorizedError } from '../errors/unauthorized-error'

export const validateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization
  if (!token) {
    throw new UnauthorizedError('Token inválido')
  }

  try {
    const tokenService = new TokenServices()
    const userPayload = tokenService.decodeToken(token)
    req.body.user = userPayload
  } catch (error) {
    throw new UnauthorizedError('Token inválido')
  }

  next()
}
