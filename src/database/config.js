import 'dotenv/config'
import { Task } from '../models/Task'

export default {
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  dialect: 'mysql',
  models: [Task],
}
