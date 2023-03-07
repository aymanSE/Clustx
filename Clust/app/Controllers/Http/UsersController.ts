import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import {schema} from '@ioc:Adonis/Core/Validator'

export default class UsersController {
    
    public async get(/*ctx: HttpContextContract*/){
        var result = User.all()
        return result
    }

    public async getById(ctx: HttpContextContract){
        var id= ctx.params.id
        var result = User.findOrFail(id)
        return result
    }


    public async create(ctx: HttpContextContract){
       const newSchema= schema.create({
        first_name: schema.string(),
        Last_name: schema.string(),
        birth_date: schema.date(),
        gender: schema.enum(["female", "male"]),
        about: schema.string(),
        image: schema.string(),
        verified: schema.boolean(),
        access_role: schema.enum(["admen", "attendee", "organizer"]),
        SID: schema.number(),
        email: schema.string(),
        password: schema.string(),
       })
       var fields= await ctx.request.validate({schema: newSchema})
       var user= new User()
       user.firstName= fields.first_name
       user.LastName= fields.Last_name
       user.birthDate= fields.birth_date
       user.gender= fields.gender
       user.about= fields.about
       user.image= fields.image
       user.accessRole= fields.access_role
       user.email= fields.email
       user.SID= fields.SID
       user.password= fields.password
       var result= await user.save()
       return result
    }

    public async update(ctx: HttpContextContract){
       const newSchema= schema.create({
        first_name: schema.string(),
        Last_name: schema.string(),
        birth_date: schema.date(),
        gender: schema.enum(["female", "male"]),
        about: schema.string(),
        image: schema.string(),
        verified: schema.boolean(),
        access_role: schema.enum(["admen", "attendee", "organizer"]),
        SID: schema.number(),
        email: schema.string(),
        password: schema.string(),
        id: schema.number()
       })
       var fields= await ctx.request.validate({schema: newSchema})
       var user=  await User.findOrFail(fields.id)
       user.firstName= fields.first_name
       user.LastName= fields.Last_name
       user.birthDate= fields.birth_date
       user.gender= fields.gender
       user.about= fields.about
       user.image= fields.image
       user.accessRole= fields.access_role
       user.email= fields.email
       user.SID= fields.SID
       user.password= fields.password
       var result= await user.save()
       return result
    }

    public async destroy(ctx: HttpContextContract){
        try{
            var id = ctx.params.id;
            var  user = await  User.findOrFail(id);
            try{
            await  user.delete();
            return { message: "The  user has been deleted!" }
            }
            catch(e: unknown){
              return  { message: "Cannot delete a used foreign key :(" }
            }
            }
            catch(e:unknown){
                return { message: "User not found :(" }
            }
    }
}
