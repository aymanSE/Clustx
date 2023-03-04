import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class EventInteraction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"event_id"})
  public eventId: number

  @column({serializeAs:"interaction_id"})
  public interactionId: number
}
