import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"name"})
  public name: string

  @column({serializeAs:"description"})
  public description: string

  @column({serializeAs:"category_id"})
  public categoryId: number

  @column({serializeAs:"organizer_id"})
  public organizerId: number

  @column({serializeAs:"startDateTime"})
  public startDateTime: DateTime

  @column({serializeAs:"endDateTime"})
  public endDateTime: DateTime

  @column({serializeAs:"status"})
  public status: DateTime

  @column({serializeAs:"views"})
  public views: number

  @column({serializeAs:"capacity"})
  public capacity: number

  @column({serializeAs:"thankingMessage"})
  public thankingMessage: string
}
