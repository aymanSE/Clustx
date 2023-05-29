import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema,rules} from '@ioc:Adonis/Core/Validator'
import Report from 'App/Models/Report'

export default class ReportsController {

    public async get(/*ctx: HttpContextContract*/){
        var result = Report.all()
        return result
    }

    public async getById(ctx: HttpContextContract){
        var id= ctx.params.id
        var result = Report.findOrFail(id)
        return result
    }


    public async create(ctx: HttpContextContract){
       const newSchema= schema.create({
        description: schema.string(),
        event_id: schema.number([
            rules.exists({
                table: 'events',
                column:'id'
            }),
        ]),
       
       })
       var fields= await ctx.request.validate({schema: newSchema, messages:{
        "exists": "{{field}} (foreign key) is not existed"
    } })
       var report= new Report()
       report.description= fields.description
       report.eventId=fields.event_id
        var result= await report.save()
       return result
    }

    public async update(ctx: HttpContextContract){
        const newSchema= schema.create({
            description: schema.string(),
            event_id: schema.number([
                rules.exists({
                    table: 'events',
                    column:'id'
                }),
            ]),
            id: schema.number()

           })
           var fields= await ctx.request.validate({schema: newSchema, messages:{
            "exists": "{{field}} (foreign key) is not existed"
        } })
           var report= await Report.findOrFail(fields.id)
           report.description= fields.description
           report.eventId=fields.event_id
            var result= await report.save()
           return result
    }

    public async destroy(ctx: HttpContextContract){
        try{
            var id = ctx.params.id;
            var  report = await  Report.findOrFail(id);
            try{
            await  report.delete();
            return { message: "The  report has been deleted!" }
            }
            catch(e: unknown){
              return  { message: "Cannot delete a used foreign key :(" }
            }
            }
            catch(e:unknown){
                return { message: "Report not found :(" }
            }
    }

}
