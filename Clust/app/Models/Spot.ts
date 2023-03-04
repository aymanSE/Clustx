import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Spot extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"checked"})
  public checked: boolean

  @column({serializeAs:"event_id"})
  public eventId: number

  @column({serializeAs:"user_id"})
  public userId: number
}
