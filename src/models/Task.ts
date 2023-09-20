import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript'

@Table({
  tableName: 'tasks',
  modelName: 'Task',
  timestamps: true,
})
export class Task extends Model {
  @AllowNull(false)
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare title: string

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare description: string

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
  declare end_date: Date

  @AllowNull(false)
  @Column({
    type: DataType.ENUM('LOW', 'MEDIUM', 'HIGH'),
  })
  declare priority: 'LOW' | 'MEDIUM' | 'HIGH'

  @AllowNull(false)
  @CreatedAt
  @Column({
    type: DataType.DATE,
  })
  declare created_at: Date

  @AllowNull(false)
  @UpdatedAt
  @Column({
    type: DataType.DATE,
  })
  declare updated_at: Date
}
