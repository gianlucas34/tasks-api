import { NextFunction, Request, RequestHandler, Response } from 'express'
import { jwt } from '../lib/jwt'

export const ensureAuth: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { authorization } = request.headers

  if (!authorization) {
    return response.status(401).send({
      error: 'Você não está autenticado, por favor entre na sua conta!',
    })
  }

  const [type, token] = authorization.split(' ')

  if (type !== 'Bearer') {
    return response.status(401).send({
      error: 'Você não está autenticado, por favor entre na sua conta!',
    })
  }

  const jwtData = jwt.verify(token)

  if (jwtData === 'JWT_SECRET_NOT_FOUND') {
    return response
      .status(500)
      .send({ error: 'Erro ao verificar o token de acesso!' })
  } else if (jwtData === 'INVALID_JWT') {
    return response.status(401).send({
      error: 'Você não está autenticado, por favor entre na sua conta!',
    })
  }

  request.headers.userId = jwtData.id
  request.headers.userEmail = jwtData.email

  return next()
}
