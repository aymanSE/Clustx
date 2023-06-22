import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema} from '@ioc:Adonis/Core/Validator'
import Answer from 'App/Models/Answer'
export default class AnswersController {
    
    public async get(/*ctx: HttpContextContract*/){
        var result = Answer.all()
        return result
    }
    public async getbyIntraction(ctx: HttpContextContract){
        var result = Answer.query().select("*").where('interactionId','=',ctx.params.id)
        return result
      
    }
    public async getById(ctx: HttpContextContract){
        var id= ctx.params.id
        var result = Answer.findOrFail(id)
        return result
    }


    public async create(ctx: HttpContextContract){
       const newSchema= schema.create({
        text_description: schema.string(),
        interactionId: schema.number(),
       })
       var fields= await ctx.request.validate({schema: newSchema})
       var answer= new Answer()
       answer.textDescription= fields.text_description
       answer.interactionId=fields.interactionId
       var result= await answer.save()
       return result
    }

    public async update(ctx: HttpContextContract){
       const newSchema= schema.create({
        text_description: schema.string(),
        id: schema.number()
       })
       var fields= await ctx.request.validate({schema: newSchema})
       var answer=  await Answer.findOrFail(fields.id)
       answer.textDescription= fields.text_description
       var result= await answer.save()
       return result
    }

    public async destroy(ctx: HttpContextContract){
        try{
            var id = ctx.params.id;
            var  answer = await  Answer.findOrFail(id);
            try{
            await  answer.delete();
            return { message: "The  answer has been deleted!" }
            }
            catch(e: unknown){
              return  { message: "Cannot delete a used foreign key :(" }
            }
            }
            catch(e:unknown){
                return { message: "Answer not found :(" }
            }
    }
}