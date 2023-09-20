import express from 'express'
import { getAllTasksRoute } from './get-all-tasks'
import { getTaskById } from './get-task-by-id'

const router = express.Router()

router.get('/tasks', getAllTasksRoute)
router.get('/tasks/:id', getTaskById)

export const TaskRoutes = router
