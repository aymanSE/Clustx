import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Image extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"path"})
  public path: string

  @column({serializeAs:"event_id"})
  public eventId: number

  @column({serializeAs:"is_memory"})
  public isMemory: boolean
}
