import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Event from './Event'

export default class Image extends BaseModel {
  public static table= "images"
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"path"})
  public path: string

  @column({serializeAs:"event_id"})
  public eventId: number

  @column({serializeAs:"is_memory"})
  public isMemory: boolean

  @belongsTo(()=>Event) 
  public event: BelongsTo<typeof Event>
}
