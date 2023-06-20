import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

export default class  Country extends BaseModel {
  public static table= "countries"
  @column({ isPrimary: true })
  public id: number
  @column({serializeAs:"country_name"})
  public country_name: string

}
