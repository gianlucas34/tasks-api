import { Request, Response } from 'express'
import { format } from 'date-fns'
import { Task } from '../../models/Task'

export const getAllTasksRoute = async (_: Request, response: Response) => {
  const tasksFromDB = await Task.findAll({ raw: true })
  const tasks = tasksFromDB.map((task) => ({
    ...task,
    end_date: format(task.end_date, 'dd-MM-yyyy'),
  }))

  return response.status(200).json(tasks)
}
