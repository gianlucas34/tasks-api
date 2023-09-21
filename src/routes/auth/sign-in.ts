import { Request, Response } from 'express'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { User } from '../../models/User'
import { jwt } from '../../lib/jwt'

export const signInRoute = async (request: Request, response: Response) => {
  const bodySchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  try {
    const { email, password } = bodySchema.parse(request.body)
    const user = await User.findOne({ where: { email } })

    if (!user) {
      return response.status(400).send({ error: 'Usuário não cadastrado!' })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return response
        .status(401)
        .send({ error: 'Email e/ou senha incorreto(s)!' })
    }

    const accessToken = jwt.sign({
      id: user.id,
      email: user.email,
    })

    if (accessToken === 'JWT_SECRET_NOT_FOUND') {
      return response
        .status(500)
        .send({ error: 'Erro ao gerar o token de acesso!' })
    }

    return response.status(200).send({
      email: user.email,
      access_token: accessToken,
    })
  } catch (error: any) {
    return response.status(500).send({ error: error.message })
  }
}
