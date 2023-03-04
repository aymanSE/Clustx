import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Answer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"text_description"})
  public textDescription: string
}
