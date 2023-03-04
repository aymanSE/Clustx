import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class BlockList extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"user_id"})
  public userId: number

  @column({serializeAs:"blocked_id"})
  public blockedId: number
}
