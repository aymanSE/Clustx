import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Event from './Event'

export default class Interaction extends BaseModel {
  public static table= "interactions"
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"type"})
  public type: string
  
  @column({serializeAs:"eventId"})
  public eventId: number
  
  @belongsTo (()=>Event)
  public answer: BelongsTo<typeof Event>
}
