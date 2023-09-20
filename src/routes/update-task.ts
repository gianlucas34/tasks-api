import { Request, Response } from 'express'
import { z } from 'zod'
import { isBefore, parse } from 'date-fns'
import BR from 'date-fns/locale/pt-BR'
import { Task } from '../models/Task'

export const updateTaskRoute = async (request: Request, response: Response) => {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })
  const bodySchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    end_date: z.string().optional(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  })

  try {
    const { id } = paramsSchema.parse(request.params)
    const { title, description, end_date, priority } = bodySchema.parse(
      request.body
    )
    let parsedDate

    if (!!end_date) {
      parsedDate = parse(end_date, 'dd-MM-yyyy', new Date(), {
        locale: BR,
      })

      if (isBefore(parsedDate, new Date())) {
        return response.status(400).send({
          error: 'Data de vencimento da tarefa não pode ser no passado!',
        })
      }
    }

    await Task.update(
      {
        title,
        description,
        priority,
        ...(!!end_date && {
          end_date: parse(end_date, 'dd-MM-yyyy', new Date(), {
            locale: BR,
          }),
        }),
      },
      { where: { id } }
    )

    return response
      .status(200)
      .send({ message: 'Tarefa atualizada com sucesso!' })
  } catch (error: any) {
    return response.status(500).send({ error: error.message })
  }
}
