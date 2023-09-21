import { Request, Response } from 'express'
import { z } from 'zod'
import { parse, isBefore } from 'date-fns'
import BR from 'date-fns/locale/pt-BR'
import { Task } from '../../models/Task'
import { nodemailer } from '../../lib/nodemailer'
import { calendar } from '../../lib/calendar'

export const createTaskRoute = async (request: Request, response: Response) => {
  const headersSchema = z.object({
    userEmail: z.string(),
  })
  const bodySchema = z.object({
    title: z.string(),
    description: z.string(),
    end_date: z.string(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  })

  try {
    const { userEmail } = headersSchema.parse(request.headers)
    const { title, description, end_date, priority } = bodySchema.parse(
      request.body
    )
    const parsedDate = parse(end_date, 'dd-MM-yyyy', new Date(), {
      locale: BR,
    })

    if (isBefore(parsedDate, new Date())) {
      return response.status(400).send({
        error: 'Data de vencimento da tarefa não pode ser no passado!',
      })
    }

    const task = await Task.create({
      title,
      description,
      priority,
      end_date: parsedDate,
    })

    await calendar.insertEvent(task)
    await nodemailer.sendEmail({
      email: userEmail,
      task,
    })

    return response.status(201).json(task)
  } catch (error: any) {
    return response.status(500).send({ error: error.message })
  }
}
