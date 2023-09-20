import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import config from '../database/config'
import { Task } from '../models/Task'
import { User } from '../models/User'

const sequelize = new Sequelize(config as SequelizeOptions)

sequelize.addModels([Task, User])

export default sequelize
