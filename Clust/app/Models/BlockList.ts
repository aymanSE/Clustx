import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class BlockList extends BaseModel {
  public static table= "block_lists"
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"user_id"})
  public userId: number

  @column({serializeAs:"blocked_id"})
  public blockedId: number

  @belongsTo(()=>User)
  public user: BelongsTo<typeof User>

  @belongsTo(()=>User)
  public blocked: BelongsTo<typeof User>
}
