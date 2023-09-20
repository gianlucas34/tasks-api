import { Request, Response } from 'express'
import { z } from 'zod'
import { Task } from '../models/Task'

export const getTaskById = async (request: Request, response: Response) => {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)
  const task = await Task.findOne({ where: { id } })

  return response.status(200).json(task)
}
