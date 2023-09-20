import { Request, Response } from 'express'
import { Task } from '../models/Task'

export const getAllTasksRoute = async (_: Request, response: Response) => {
  const tasks = await Task.findAll()

  return response.status(200).json(tasks)
}
