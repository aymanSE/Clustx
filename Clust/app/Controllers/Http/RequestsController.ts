import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Request from 'App/Models/Request'
import {schema,rules} from '@ioc:Adonis/Core/Validator'

export default class RequestsController {

    public async get(/*ctx: HttpContextContract*/){
        var result = Request.all()
        return result
    }

    public async getById(ctx: HttpContextContract){
        var id= ctx.params.id
        var result = Request.findOrFail(id)
        return result
    }


    public async create(ctx: HttpContextContract){
       const newSchema= schema.create({
        status: schema.string(),
        user_id: schema.number([
            rules.exists({
                table: 'users',
                column:'id'
            }),
        ]),
        sid:schema.number()
       })
       var fields= await ctx.request.validate({schema: newSchema})
       var request= new Request()
       request.sid= fields.sid
       request.status=fields.status
       request.user_id=fields.user_id
       var result= await request.save()
       return result
    }

    public async update(ctx: HttpContextContract){
        const newSchema= schema.create({
            status: schema.string(),
            user_id: schema.number([
                rules.exists({
                    table: 'users',
                    column:'id'
                }),
            ]),
            sid:schema.number(),
            id: schema.number()

           })
           var fields= await ctx.request.validate({schema: newSchema})
           //        var event=  await Event.findOrFail(fields.id)

           var request= await Request.findOrFail(fields.id)
           request.sid= fields.sid
           request.status=fields.status
           request.user_id=fields.user_id
           var result= await request.save()
           return result
    }

    public async destroy(ctx: HttpContextContract){
        try{
            var id = ctx.params.id;
            var  request = await  Request.findOrFail(id);
            try{
            await  request.delete();
            return { message: "The  request has been deleted!" }
            }
            catch(e: unknown){
              return  { message: "Cannot delete a used foreign key :(" }
            }
            }
            catch(e:unknown){
                return { message: "Request not found :(" }
            }
    }

}
