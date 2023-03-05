import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Answer from './Answer'

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
}
