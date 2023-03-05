import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Report extends BaseModel {
  public static table= "reports"
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"description"})
  public description: string
  
  @column({serializeAs:"event_id"})
  public eventId: number
}
