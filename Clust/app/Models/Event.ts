import { BaseModel, belongsTo, BelongsTo, column, HasMany, hasMany, HasOne, hasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Category from './Category'
import Image from './Image'
import Interaction from './Interaction'
import Report from './Report'
import Spot from './Spot'
import Tag from './Tag'
import User from './User'
import Country from './Country'
import { Address } from 'proxy-addr'

export default class Event extends BaseModel {
  public static table= "events"
  @column({ isPrimary: true ,serializeAs:"id"})
  public id: number

  @column({serializeAs:"name"})
  public name: string

  @column({serializeAs:"description"})
  public description: string

  @column({serializeAs:"category_id"})
  public categoryId: number
  @column({serializeAs:"country_id"})
  public countryId: number
  @column({serializeAs:"organizer_id"})
  public organizerId: number

  @column({serializeAs:"start_date"})
  public start_date: string

  @column({serializeAs:"end_date"})
  public end_date: string

  @column({serializeAs:"address"})
  public address: string
  @column({serializeAs:"status"})
  public status: string

  @column({serializeAs:"views"})
  public views: number

  @column({serializeAs:"capacity"})
  public capacity: number

  @column({serializeAs:"thanking_message"})
  public thanking_message: string
  @belongsTo(()=>Country) 
  public country: BelongsTo<typeof Country>
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
  @hasOne (()=>Interaction)
  public interaction : HasOne<typeof Interaction>
  @hasMany (()=>Spot)
  public spot: HasMany<typeof Spot>
    totalViews: number
}
