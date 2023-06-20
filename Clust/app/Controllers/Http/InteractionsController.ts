import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Interaction from 'App/Models/Interaction'
import {schema, rules} from '@ioc:Adonis/Core/Validator'

export default class InteractionsController {
    
    public async get(/*ctx: HttpContextContract*/){
        var result = Interaction.all()
        return result
    }

    public async getById(ctx: HttpContextContract){
        var id= ctx.params.id
        var result = Interaction.findOrFail(id)
        return result
    }


    public async create(ctx: HttpContextContract){
       const newSchema= schema.create({
        type: schema.string(),
        answer_id: schema.number([
            rules.exists({
                table: 'answers',
                column:'id'
            })
        ])
       })
       var fields= await ctx.request.validate({schema: newSchema, messages:{
        "exists": "{{field}} (foreign key) is not existed"
    } })
       var interaction= new Interaction()
       interaction.type= fields.type
       interaction.eventId= fields.answer_id
       var result= await interaction.save()
       return result
    }

    public async update(ctx: HttpContextContract){
       const newSchema= schema.create({
        type: schema.string(),
        answer_id: schema.number([
            rules.exists({
                table: 'answers',
                column:'id'
            }),
        ]),
        id: schema.number()
       })
       var fields= await ctx.request.validate({schema: newSchema, messages:{
        "exists": "{{field}} (foreign key) is not existed"
    } })
       var interaction=  await Interaction.findOrFail(fields.id)
       interaction.type= fields.type
       interaction.eventId= fields.answer_id
       var result= await interaction.save()
       return result
    }

    public async destroy(ctx: HttpContextContract){
        try{
            var id = ctx.params.id;
            var  interaction = await  Interaction.findOrFail(id);
            try{
            await  interaction.delete();
            return { message: "The  interaction has been deleted!" }
            }
            catch(e: unknown){
              return  { message: "Cannot delete a used foreign key :(" }
            }
            }
            catch(e:unknown){
                return { message: "Interaction not found :(" }
            }
    }



}
