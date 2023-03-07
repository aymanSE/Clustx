import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import Spot from 'App/Models/Spot'

export default class SpotsController {
    
    public async get(/*ctx: HttpContextContract*/){
        var result = Spot.all()
        return result
    }

    public async getById(ctx: HttpContextContract){
        var id= ctx.params.id
        var result = Spot.findOrFail(id)
        return result
    }


    public async create(ctx: HttpContextContract){
       const newSchema= schema.create({
        checked: schema.boolean(),
        event_id: schema.number([
            rules.exists({
                table: 'events',
                column:'id'
            }),
        ]),
        user_id: schema.number([
            rules.exists({
                table: 'users',
                column:'id'
            })
        ])
       })
       var fields= await ctx.request.validate({schema: newSchema})
       var spot= new Spot()
       spot.checked= fields.checked
       spot.eventId= fields.event_id
       spot.userId= fields.user_id
       var result= await spot.save()
       return result
    }

    public async update(ctx: HttpContextContract){
       const newSchema= schema.create({
        checked: schema.boolean(),
        event_id: schema.number([
            rules.exists({
                table: 'events',
                column:'id'
            }),
        ]),
        user_id: schema.number([
            rules.exists({
                table: 'users',
                column:'id'
            })
        ]),
        id: schema.number()
       })
       var fields= await ctx.request.validate({schema: newSchema})
       var spot=  await Spot.findOrFail(fields.id)
       spot.checked= fields.checked
       spot.eventId= fields.event_id
       spot.userId= fields.user_id
       var result= await spot.save()
       return result
    }

    public async destroy(ctx: HttpContextContract){
        try{
            var id = ctx.params.id;
            var  spot = await  Spot.findOrFail(id);
            try{
            await  spot.delete();
            return { message: "The  spot has been deleted!" }
            }
            catch(e: unknown){
              return  { message: "Cannot delete a used foreign key :(" }
            }
            }
            catch(e:unknown){
                return { message: "Spot not found :(" }
            }
    }
}
