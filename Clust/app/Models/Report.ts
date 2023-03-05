import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Event from './Event'

export default class Report extends BaseModel {
  public static table= "reports"
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"description"})
  public description: string
  
  @column({serializeAs:"event_id"})
  public eventId: number
  
  @belongsTo(()=>Event) 
  public event: BelongsTo<typeof Event>
}
