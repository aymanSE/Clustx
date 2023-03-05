import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Event from './Event'
import User from './User'

export default class Spot extends BaseModel {
  public static table= "spots"
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"checked"})
  public checked: boolean

  @column({serializeAs:"event_id"})
  public eventId: number

  @column({serializeAs:"user_id"})
  public userId: number
  
  @belongsTo(()=>Event) 
  public event: BelongsTo<typeof Event>

  @belongsTo(()=>User)
  public interaction: BelongsTo<typeof User>
}
