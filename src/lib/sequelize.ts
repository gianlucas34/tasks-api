import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import config from '../database/config'

const sequelize = new Sequelize(config as SequelizeOptions)

export default sequelize
