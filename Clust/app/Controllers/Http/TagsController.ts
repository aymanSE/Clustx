import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema} from '@ioc:Adonis/Core/Validator'
import Tag from 'App/Models/Tag'

export default class TagsController {

   public async get(){
       var result = Tag.all()
       return result
   }

   public async getById(ctx: HttpContextContract){
       var id= ctx.params.id
       var result = Tag.findOrFail(id)
       return result
   }

   
   public async create(ctx: HttpContextContract){
       const newSchema= schema.create({
           text_description: schema.string(),
       })
       var fields= await ctx.request.validate({schema: newSchema})
       var tag= new Tag()
       tag.textDescription= fields.text_description
       var result= await tag.save()
       return result
    }
    
   public async update(ctx: HttpContextContract){
       const newSchema= schema.create({
           text_description: schema.string(),
        id: schema.number()
       })
       var fields= await ctx.request.validate({schema: newSchema})
       var tag=  await Tag.findOrFail(fields.id)
       tag.textDescription= fields.text_description
       var result= await tag.save()
       return result
    }

    public async destroy(ctx: HttpContextContract){
       try{
           var id = ctx.params.id;
           var  tag = await  Tag.findOrFail(id);
           try{
           await  tag.delete();
           return { message: "The  Tag has been deleted!" }
           }
           catch(e: unknown){
             return  { message: "Cannot delete a used foreign key ;(" }
           }
           }
           catch(e:unknown){
               return { message: "Tag not found ;(" }
           }
   }

}
