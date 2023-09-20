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
  tableName: 'users',
  modelName: 'User',
  timestamps: true,
})
export class User extends Model {
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
  declare email: string

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare password: string

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
