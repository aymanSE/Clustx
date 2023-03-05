import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Interaction from './Interaction'
import Event from './Event'

export default class EventInteraction extends BaseModel {
  public static table= "event_interactions"
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"event_id"})
  public eventId: number

  @column({serializeAs:"interaction_id"})
  public interactionId: number 
  
  @belongsTo(()=>Event) 
  public event: BelongsTo<typeof Event>

  @belongsTo(()=>Interaction)
  public interaction: BelongsTo<typeof Interaction>
}
