import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from 'App/Models/Event'

import {schema,rules} from '@ioc:Adonis/Core/Validator'
import Image from 'App/Models/Image'
import Application from '@ioc:Adonis/Core/Application'

export default class EventsController {

    public async get({params}){
        var result = await Event.query().preload("images",(imagesQuery)=>imagesQuery.where('event_id',params.id))
        return result
    }  

    
    public async getById(ctx: HttpContextContract){
        var id= ctx.params.id
        var result = Event.findOrFail(id)
        return result
    }
//TODO
    public async addImage(ctx: HttpContextContract){
        const newSchema= schema.create({

         path: schema.string(),
         event_id: schema.number([
            rules.exists({
                table: 'events',
                column:'id'
            }),
        ]),
        is_memory:schema.boolean()
        })
        var fields= await ctx.request.validate({schema: newSchema})
        var image= new Image()

        image.path= fields.path
        image.isMemory=fields.is_memory
        image.eventId=fields.event_id    
        var result= await image.save()
        return result
     }
//
    public async create(ctx: HttpContextContract){

        const newSchema= schema.create({
            name : schema.string(),
            description :schema.string(),
            category_id: schema.number([
                rules.exists({
                    table: 'categories',
                    column:'id'
                }),

            ]),

            organizer_id: schema.number([
                rules.exists({
                    table: 'users',
                    column:'id'
                }),

            ]),
            
            start_date: schema.date(),
            end_date: schema.date(),
            status:schema.enum(["available","unavailable"]),
            views:schema.number(),
            capacity: schema.number(),
            thanking_message:schema.string()

        })
        var fields= await ctx.request.validate({schema: newSchema})
      
            var event = new Event()
            event.name=  fields.name
            event.description= fields.description
            event.categoryId=  fields.category_id
            event.organizerId= fields.organizer_id
            event.start_date= fields.start_date.toString()
            event.end_date=    fields.end_date.toString()
            event.status=    fields.status
            event.views=   fields.views
            event.capacity=  fields.capacity
            event.thanking_message= fields.thanking_message

            var result= await event.save()
            return result

    }

    public async update(ctx: HttpContextContract){

        const newSchema= schema.create({
            name : schema.string(),
            description :schema.string(),
            category_id: schema.number([
                rules.exists({
                    table: 'categories',
                    column:'id'
                }),

            ]),

            organizer_id: schema.number([
                rules.exists({
                    table: 'users',
                    column:'id'
                }),

            ]),
            
            start_date: schema.date(),
            end_date: schema.date(),
            status:schema.enum(["available","unavailable"]),
            views:schema.number(),
            capacity: schema.number(),
            thanking_message:schema.string(),
            id: schema.number()
        })
        var fields= await ctx.request.validate({schema: newSchema})
        var event=  await Event.findOrFail(fields.id)
            event.name=  fields.name
            event.description= fields.description
            event.categoryId=  fields.category_id
            event.organizerId= fields.organizer_id
            event.start_date= fields.start_date.toString()
            event.end_date=    fields.end_date.toString()
            event.status=    fields.status
            event.views=   fields.views
            event.capacity=  fields.capacity
            event.thanking_message= fields.thanking_message
            var result= await event.save()
            return result
    }
    public async destroy(ctx: HttpContextContract){
        try{
            var id = ctx.params.id;
            var  event = await  Event.findOrFail(id);
            try{
            await  event.delete();
            return { message: "The  event has been deleted!" }
            }
            catch(e: unknown){
              return  { message: "Cannot delete a used foreign key ;(" }
            }
            }
            catch(e:unknown){
                return { message: "Event not found ;(" }
            }
    }
    public async uploadImage(ctx: HttpContextContract){
        var image= ctx.request.file("image", {
          extnames:["png", "jpg", "jpeg"]
        })
        if(!image) return{ message: "Invalid file" }
        await image.move(Application.tmpPath("images"))
        return{ message: "The image has been uploaded!" }
      }
}
