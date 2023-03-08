import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema} from '@ioc:Adonis/Core/Validator'
import Category from 'App/Models/Category'

export default class CategoriesController {

    public async get(){
        var result = Category.all()
        return result
    }

    public async getById(ctx: HttpContextContract){
        var id= ctx.params.id
        var result = Category.findOrFail(id)
        return result
    }

    
    public async create(ctx: HttpContextContract){
        const newSchema= schema.create({
         name: schema.string(),
        })
        var fields= await ctx.request.validate({schema: newSchema})
        var category= new Category()
        category.name= fields.name
        var result= await category.save()
        return result
     }
     
    public async update(ctx: HttpContextContract){
        const newSchema= schema.create({
         name: schema.string(),
         id: schema.number()
        })
        var fields= await ctx.request.validate({schema: newSchema})
        var category=  await Category.findOrFail(fields.id)
        category.name= fields.name
        var result= await category.save()
        return result
     }

     public async destroy(ctx: HttpContextContract){
        try{
            var id = ctx.params.id;
            var  category = await  Category.findOrFail(id);
            try{
            await  category.delete();
            return { message: "The  category has been deleted!" }
            }
            catch(e: unknown){
              return  { message: "Cannot delete a used foreign key ;(" }
            }
            }
            catch(e:unknown){
                return { message: "Category not found ;(" }
            }
    }
}