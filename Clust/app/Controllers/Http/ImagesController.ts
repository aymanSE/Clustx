import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Image from 'App/Models/Image'
import {schema,rules} from '@ioc:Adonis/Core/Validator'
import Application from '@ioc:Adonis/Core/Application'



export default class ImagesController {

    public async get(){
        var result = Image.all()
        return result
    }

    public async getById(ctx: HttpContextContract){
        var id= ctx.params.id
        var result = Image.findOrFail(id)
        return result
    }

    
    public async create(ctx: HttpContextContract){
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
        var fields= await ctx.request.validate({schema: newSchema, messages:{
            "exists": "{{field}} (foreign key) is not existed"
        } })
        var image= new Image()

        image.path= fields.path
        image.isMemory=fields.is_memory
        image.eventId=fields.event_id    
        var result= await image.save()
        return result
     }
     
    public async update(ctx: HttpContextContract){
        const newSchema= schema.create({
            id: schema.number(),
            path: schema.string(),
         event_id: schema.number([
            rules.exists({
                table: 'events',
                column:'id'
            }),
        ]),
        is_memory:schema.boolean()
        })
        var fields= await ctx.request.validate({schema: newSchema, messages:{
            "exists": "{{field}} (foreign key) is not existed"
        } })
        var image= await Image.findOrFail(fields.id)

        image.path= fields.path
        image.isMemory=fields.is_memory
        image.eventId=fields.event_id
        var result= await image.save()
        return result
     }

     public async destroy(ctx: HttpContextContract){
        try{
            var id = ctx.params.id;
            var  image = await  Image.findOrFail(id);
            try{
            await  image.delete();
            return { message: "The  image has been deleted!" }
            }
            catch(e: unknown){
              return  { message: "Cannot delete a used foreign key ;(" }
            }
            }
            catch(e:unknown){
                return { message: "Image not found ;(" }
            }
    }
    public async uploadImage(ctx: HttpContextContract){
        var image= ctx.request.file("image", {
          extnames:["png", "jpg", "jpeg"]
        })        
        if(!image) return{ message: "Invalid file" }
        await image.move(Application.publicPath("images"))
        const newSchema= schema.create({
            event_id: schema.number([
               rules.exists({
                   table: 'events',
                   column:'id'
               }),
           ]),
           is_memory:schema.boolean()
           })
           var fields= await ctx.request.validate({schema: newSchema, messages:{
            "exists": "{{field}} (foreign key) is not existed"
        } })
        var newImage = new Image()
        newImage.eventId= fields.event_id
        newImage.isMemory= fields.is_memory
        newImage.path= "/images/"+image.fileName 
        await newImage.save()
        return newImage
      }
      
}