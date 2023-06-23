import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Event from './Event'

export default class Rate extends BaseModel {
  public static table= "rates"

  @column({ isPrimary: true })
  public id: number
  
  @column({serializeAs:"event_id"})
  public eventId: number

  @column({serializeAs:"user_id"})
  public userId: number

  @column({serializeAs:"rate"})
  public rate: number

  @belongsTo (()=>User)
  public user: BelongsTo<typeof User>

  @belongsTo (()=>Event)
  public event: BelongsTo<typeof Event>
}
