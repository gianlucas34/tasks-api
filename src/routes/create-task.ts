import { Request, Response } from 'express'
import { z } from 'zod'
import { parse } from 'date-fns'
import BR from 'date-fns/locale/pt-BR'
import { Task } from '../models/Task'

export const createTaskRoute = async (request: Request, response: Response) => {
  const bodySchema = z.object({
    title: z.string(),
    description: z.string(),
    end_date: z.string(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  })

  try {
    const { title, description, end_date, priority } = bodySchema.parse(
      request.body
    )

    const task = await Task.create({
      title,
      description,
      priority,
      end_date: parse(end_date, 'dd-MM-yyyy', new Date(), {
        locale: BR,
      }),
    })

    return response.status(201).json(task)
  } catch (error: any) {
    return response.status(500).send({ error: error.message })
  }
}