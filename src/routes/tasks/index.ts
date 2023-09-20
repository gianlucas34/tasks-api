import express from 'express'
import { ensureAuth } from '../../middlewares/ensure-auth'
import { getAllTasksRoute } from './get-all-tasks'
import { getTaskByIdRoute } from './get-task-by-id'
import { createTaskRoute } from './create-task'
import { updateTaskRoute } from './update-task'
import { deleteTaskRoute } from './delete-task'

const router = express.Router()

router.get('/tasks', ensureAuth, getAllTasksRoute)
router.get('/tasks/:id', ensureAuth, getTaskByIdRoute)
router.post('/tasks', ensureAuth, createTaskRoute)
router.put('/tasks/:id', ensureAuth, updateTaskRoute)
router.delete('/tasks/:id', ensureAuth, deleteTaskRoute)

export const TasksRoutes = router
