import { BaseModel, belongsTo, BelongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Category from './Category'
import EventInteraction from './EventInteraction'
import EventTag from './EventTag'
import Image from './Image'
import Report from './Report'
import Spot from './Spot'
import User from './User'

export default class Event extends BaseModel {
  public static table= "events"
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

  @belongsTo(()=>Category) 
  public category: BelongsTo<typeof Category>

  @belongsTo(()=>User,{
    foreignKey:"organizerId"
  }) 
  public organizer: BelongsTo<typeof User>

  @hasMany (()=>EventInteraction)
  public eventInteraction: HasMany<typeof EventInteraction>
  
  @hasMany (()=>EventTag)
  public eventTag: HasMany<typeof EventTag>
  
  @hasMany (()=>Image)
  public images: HasMany<typeof Image>
  
  @hasMany (()=>Report)
  public report: HasMany<typeof Report>
  
  @hasMany (()=>Spot)
  public spot: HasMany<typeof Spot>
}
