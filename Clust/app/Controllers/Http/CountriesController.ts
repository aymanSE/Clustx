import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema} from '@ioc:Adonis/Core/Validator'
import Country from 'App/Models/Country'

export default class CountriesController {

   public async get(){
       var result = Country.query()
       return result
   }

   public async getById(ctx: HttpContextContract){
       var id= ctx.params.id
       var result = Country.findOrFail(id)
       return result
   }

   
   public async create(ctx: HttpContextContract){
       const newSchema= schema.create({
        country_name: schema.string(),
       })
       var fields= await ctx.request.validate({schema: newSchema})
       var tag= new Country()
       tag.country_name= fields.country_name
       var result= await tag.save()
       return result
    }
    
   public async update(ctx: HttpContextContract){
       const newSchema= schema.create({
        country_name: schema.string(),
        id: schema.number()
       })
       var fields= await ctx.request.validate({schema: newSchema})
       var tag=  await Country.findOrFail(fields.id)
       tag.country_name= fields.country_name
       var result= await tag.save()
       return result
    }

    public async destroy(ctx: HttpContextContract){
       try{
           var id = ctx.params.id;
           var  tag = await  Country.findOrFail(id);
           try{
           await  tag.delete();
           return { message: "The  Country has been deleted!" }
           }
           catch(e: unknown){
             return  { message: "Cannot delete a used foreign key ;(" }
           }
           }
           catch(e:unknown){
               return { message: "Country not found ;(" }
           }
   }

}
