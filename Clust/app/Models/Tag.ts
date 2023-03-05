import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

export default class Tag extends BaseModel {
  public static table= "tags"
  @column({ isPrimary: true })
  public id: number
  @column({serializeAs:"text_description"})
  public textDescription: string
}
