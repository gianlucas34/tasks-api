import express from 'express'
import { getAllTasksRoute } from './get-all-tasks'
import { getTaskByIdRoute } from './get-task-by-id'
import { createTaskRoute } from './create-task'
import { updateTaskRoute } from './update-task'
import { deleteTaskRoute } from './delete-task'

const router = express.Router()

router.get('/tasks', getAllTasksRoute)
router.get('/tasks/:id', getTaskByIdRoute)
router.post('/tasks', createTaskRoute)
router.put('/tasks/:id', updateTaskRoute)
router.delete('/tasks/:id', deleteTaskRoute)

export const TaskRoutes = router
