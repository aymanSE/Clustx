import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Answer from './Answer'
import EventInteraction from './EventInteraction'

export default class Interaction extends BaseModel {
  public static table= "interactions"
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"type"})
  public type: string
  
  @column({serializeAs:"answer_id"})
  public answerId: number
  
  @belongsTo (()=>Answer)
  public answer: BelongsTo<typeof Answer>

  @hasMany (()=>EventInteraction)
  public eventInteraction: HasMany<typeof EventInteraction>
}
