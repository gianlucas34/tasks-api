import { Request, Response } from 'express'
import { z } from 'zod'
import { format } from 'date-fns'
import { Task } from '../../models/Task'

export const getTaskByIdRoute = async (
  request: Request,
  response: Response
) => {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)
  const taskFromDB = await Task.findOne({
    where: { id },
    raw: true,
  })
  const task = {
    ...taskFromDB,
    ...(!!taskFromDB?.end_date && {
      end_date: format(taskFromDB.end_date, 'dd-MM-yyyy'),
    }),
  }

  return response.status(200).json(task)
}
