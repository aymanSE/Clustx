import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Event from './Event'
import Tag from './Tag'

export default class EventTag extends BaseModel {
  public static table= "event_tags"
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"event_id"})
  public eventId: number

  @column({serializeAs:"tag_id"})
  public tagId: number
  
  @belongsTo(()=>Event) 
  public event: BelongsTo<typeof Event>

  @belongsTo(()=>Tag)
  public interaction: BelongsTo<typeof Tag>
}
