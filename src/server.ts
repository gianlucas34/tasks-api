import './lib/sequelize'
import express from 'express'
import cors from 'cors'
import { TaskRoutes } from './routes'

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(TaskRoutes)

app.listen(3333)
