import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from '@ioc:Adonis/Lucid/Database'
import Rate from "App/Models/Rate"

export default class RatesController {
    
    public async get(/*ctx: HttpContextContract*/){
        var result = Rate.all()
        return result
    }
    public async getRating(ctx: HttpContextContract){
        var eventId= ctx.request.input("event_id")
        var result = Database.from("rates").where("event_id", eventId).avg('rate' as "rate")
        return result
    } 
    public async getTotalRates(ctx: HttpContextContract){
        var eventId= ctx.request.input("event_id")
        var result = Database.from("rates").where("event_id", eventId).count('rate')
        return result
    } 
}
