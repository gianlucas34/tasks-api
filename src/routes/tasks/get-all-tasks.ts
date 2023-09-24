import { Request, Response } from 'express'
import { Op } from 'sequelize'
import { format } from 'date-fns'
import { Task } from '../../models/Task'

export const getAllTasksRoute = async (
  request: Request,
  response: Response
) => {
  const { priority } = request.query

  const tasksFromDB = await Task.findAll({
    raw: true,
    ...(!!priority && {
      where: {
        priority: {
          [Op.eq]: priority,
        },
      },
    }),
  })
  const tasks = tasksFromDB.map((task) => ({
    ...task,
    end_date: format(task.end_date, 'dd-MM-yyyy'),
  }))

  return response.status(200).json(tasks)
}
