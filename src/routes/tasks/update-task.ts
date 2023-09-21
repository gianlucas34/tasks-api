import { Request, Response } from 'express'
import { z } from 'zod'
import { isBefore, parse } from 'date-fns'
import BR from 'date-fns/locale/pt-BR'
import { Task } from '../../models/Task'
import { calendar } from '../../lib/calendar'

export const updateTaskRoute = async (request: Request, response: Response) => {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })
  const bodySchema = z.object({
    title: z.string(),
    description: z.string(),
    end_date: z.string(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  })

  try {
    const { id } = paramsSchema.parse(request.params)
    const { title, description, end_date, priority } = bodySchema.parse(
      request.body
    )
    const parsedEndDate = parse(end_date, 'dd-MM-yyyy', new Date(), {
      locale: BR,
    })

    if (isBefore(parsedEndDate, new Date())) {
      return response.status(400).send({
        error: 'Data de vencimento da tarefa não pode ser no passado!',
      })
    }

    await Task.update(
      {
        title,
        description,
        priority,
        end_date: parsedEndDate,
      },
      { where: { id } }
    )

    await calendar.updateEvent({
      id,
      title,
      description,
      end_date: parsedEndDate,
    })

    return response
      .status(200)
      .send({ message: 'Tarefa atualizada com sucesso!' })
  } catch (error: any) {
    return response.status(500).send({ error: error.message })
  }
}
