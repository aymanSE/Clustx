import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Interaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"type"})
  public type: string
  
  @column({serializeAs:"answer_id"})
  public answerId: number
}
