import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Event from './Event'
import Answer from './Answer'

export default class Interaction extends BaseModel {
  public static table= "interactions"
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"type"})
  public type: string
  
  @column({serializeAs:"eventId"})
  public eventId: number
  @hasMany (()=>Answer)
  public answer: HasMany<typeof Answer>
  @belongsTo (()=>Event)
  public event: BelongsTo<typeof Event>
}
