import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Event from './Event'

export default class Category extends BaseModel {
  public static table= "categories"
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"name"})
  public name: string

  @hasMany (()=>Event)
  public event: HasMany<typeof Event>
}
