import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

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
  public gender: DateTime

  @column({serializeAs:"about"})
  public about: string

  @column({serializeAs:"image"})
  public image: string
  
  @column({serializeAs:"verified"})
  public verified: boolean

  @column({serializeAs:"access_role"})
  public accessRole: DateTime

  @column({serializeAs:"SID"})
  public SID: number

  @column({serializeAs:"email"})
  public email: string

  @column({serializeAs:"password"})
  public password: string
}
