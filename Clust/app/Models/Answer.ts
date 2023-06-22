import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Interaction from './Interaction'

export default class Answer extends BaseModel {
  public static table= "answers"
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"text_description"})
  public textDescription: string
  @column({serializeAs:"interactionId"})
  public interactionId: number

  @belongsTo (()=>Interaction)
  public interaction: BelongsTo<typeof Interaction>
}
