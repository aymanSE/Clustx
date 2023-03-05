import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import EventTag from './EventTag'

export default class Tag extends BaseModel {
  public static table= "tags"
  @column({ isPrimary: true })
  public id: number
  @column({serializeAs:"text_description"})
  public textDescription: string
  
  @hasMany (()=>EventTag)
  public eventTag: HasMany<typeof EventTag>
}
