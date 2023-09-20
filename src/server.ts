import './lib/sequelize'
import express from 'express'
import cors from 'cors'
import { TasksRoutes } from './routes/tasks'
import { AuthRoutes } from './routes/auth'

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(TasksRoutes)
app.use(AuthRoutes)

app.listen(3333)
