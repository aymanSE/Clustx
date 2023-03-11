import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import {schema, rules} from '@ioc:Adonis/Core/Validator'

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

    public async login(ctx: HttpContextContract){
        const newSchema= schema.create({
            email: schema.string({}, [
                rules.email(),
            ]),
            password: schema.string()
        })
        const fields = ctx.request.validate({schema: newSchema})
        var email= (await fields).email
        var password= (await fields).password
        var result = await ctx.auth.attempt(email, password)
        return result

    }
    public async logout(ctx: HttpContextContract){
        var obj = await ctx.auth.authenticate()
        await ctx.auth.logout()
        return { message: "Logout" }
    }

    public async create(ctx: HttpContextContract){
       const newSchema= schema.create({
        first_name: schema.string(),
        Last_name: schema.string(),
        birth_date: schema.date.nullable(),
        gender: schema.enum.nullable(["female", "male"]),
        about: schema.string.nullable(),
        image: schema.string.nullable(),
        verified: schema.boolean(),
        access_role: schema.enum(["admin", "attendee", "organizer"]),
        SID: schema.number.nullable(),
        email: schema.string({}, [
            rules.email
        ]),
        password: schema.string({},[
            
        ]),
       })
       var fields= await ctx.request.validate({schema: newSchema})
       var user= new User()
       user.firstName= fields.first_name
       user.LastName= fields.Last_name
       if(fields.birth_date)
       user.birthDate= fields.birth_date
       if(fields.gender)
       user.gender= fields.gender
       if(fields.about)
       user.about= fields.about
       if(fields.image)
       user.image= fields.image
       if(fields.access_role)
       user.accessRole= fields.access_role
       if(fields.SID)
       user.SID= fields.SID
       user.email= fields.email
       user.password= fields.password
       var result= await user.save()
       return result
    }

    public async update(ctx: HttpContextContract){
        var obj = await ctx.auth.authenticate()
       const newSchema= schema.create({
        first_name: schema.string(),
        Last_name: schema.string(),
        birth_date: schema.date(),
        gender: schema.enum(["female", "male"]),
        about: schema.string(),
        image: schema.string(),
        verified: schema.boolean(),
        access_role: schema.enum(["admin", "attendee", "organizer"]),
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
        var obj = await ctx.auth.authenticate()
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
