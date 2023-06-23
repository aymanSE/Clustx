import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {schema, rules} from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Rate from "App/Models/Rate"

export default class RatesController {
    
    public async get(ctx: HttpContextContract){
        var user = await ctx.auth.authenticate()
        var result = await Rate.query().where("user_id", user.id)
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
    
    public async create(ctx: HttpContextContract) {
        const newSchema = schema.create({
            user_id: schema.number([
                rules.exists({
                    table: 'users',
                    column: 'id'
                })  
            ]),
            event_id: schema.number([
                rules.exists({
                    table: 'events',
                    column: 'id'
                })  
            ]),
            rate: schema.number(),
          })

        const fields = await ctx.request.validate({ schema: newSchema, messages:{
            "exists": "{{field}} (foreign key) is not existed"
        } })
        var  rate = new  Rate();
         rate.userId = fields.user_id;
         rate.eventId = fields.event_id;
         rate.rate = fields.rate;
        var result = await  rate.save();
        return result;
    }

}
