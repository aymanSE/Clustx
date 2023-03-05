import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class EventTag extends BaseModel {
  public static table= "event_tags"
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"event_id"})
  public eventId: number

  @column({serializeAs:"tag_id"})
  public tagId: number
}
