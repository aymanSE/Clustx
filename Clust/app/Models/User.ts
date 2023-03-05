import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import BlockList from './BlockList'
import Spot from './Spot'
import Event from './Event'

export default class User extends BaseModel {
  public static table= "users"
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"first_name"})
  public firstName: string

  @column({serializeAs:"Last_name"})
  public LastName: string
  
  @column({serializeAs:"birth_date"})
  public birthDate: DateTime
  
  @column({serializeAs:"gender"})
  public gender: string

  @column({serializeAs:"about"})
  public about: string

  @column({serializeAs:"image"})
  public image: string
  
  @column({serializeAs:"verified"})
  public verified: boolean

  @column({serializeAs:"access_role"})
  public accessRole: string

  @column({serializeAs:"SID"})
  public SID: number

  @column({serializeAs:"email"})
  public email: string

  @column({serializeAs:"password"})
  public password: string

  @hasMany (()=>BlockList)
  public blocked: HasMany<typeof BlockList>

  @hasMany (()=>Event)
  public event: HasMany<typeof Event>

  @hasMany (()=>Spot)
  public spot: HasMany<typeof Spot>

}
