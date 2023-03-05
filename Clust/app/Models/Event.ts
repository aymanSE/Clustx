import { BaseModel, belongsTo, BelongsTo, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Category from './Category'
import Image from './Image'
import Interaction from './Interaction'
import Report from './Report'
import Spot from './Spot'
import Tag from './Tag'
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
  public status: string

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

  @manyToMany (()=>Interaction)
  public eventInteraction: ManyToMany<typeof Interaction>
  
  @manyToMany (()=>Tag)
  public eventTag: ManyToMany<typeof Tag>
  
  @hasMany (()=>Image)
  public images: HasMany<typeof Image>
  
  @hasMany (()=>Report)
  public report: HasMany<typeof Report>
  
  @hasMany (()=>Spot)
  public spot: HasMany<typeof Spot>
}
