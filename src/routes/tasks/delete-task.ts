import { Request, Response } from 'express'
import { z } from 'zod'
import { Task } from '../../models/Task'

export const deleteTaskRoute = async (request: Request, response: Response) => {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  try {
    const { id } = paramsSchema.parse(request.params)

    await Task.destroy({ where: { id } })

    return response
      .status(200)
      .send({ message: 'Tarefa deletada com sucesso!' })
  } catch (error: any) {
    return response.status(500).send({ error: error.message })
  }
}
