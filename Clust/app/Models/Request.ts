import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Request extends BaseModel {
  public static table= "request"
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"sid"})
  public sid: number
  
  @column({serializeAs:"status"})
  public status: string
  
  @column({serializeAs:"user_id"})
  public user_id: number
  
  @belongsTo(()=>User) 
  public event: BelongsTo<typeof User>
}
