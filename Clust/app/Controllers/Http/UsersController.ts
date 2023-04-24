import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import Image from 'App/Models/Image'
import Application from '@ioc:Adonis/Core/Application'

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
        const fields = await ctx.request.validate({schema: newSchema})
        var email= fields.email
        var password=  fields.password
        var result = await ctx.auth.attempt(email, password)
        return result

    }

    public async otp(){
        const otpGenerator = require('otp-generator');
        const otp = otpGenerator.generate(5, { digits: true, alphabets: false, upperCase: false, specialChars: false });
        return otp
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
        birth_date: schema.string(),
        gender: schema.enum(["female", "male", "other"]),
        access_role: schema.enum(["admin", "attendee", "organizer"]),
        email: schema.string([
            rules.email(),
            rules.unique({ table: 'users', column: 'email' } )
        ]),
        password: schema.string()
       })
       var fields= await ctx.request.validate({schema: newSchema})
       var user= new User()
       user.firstName= fields.first_name
       user.LastName= fields.Last_name
       user.birthDate= fields.birth_date
       user.gender= fields.gender
       user.accessRole= fields.access_role
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
        birth_date: schema.string(),
        gender: schema.enum(["female", "male", "other"]),
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
        // var obj = await ctx.auth.authenticate()
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
    public async uploadImage(ctx: HttpContextContract){
        var image= ctx.request.file("image", {
          extnames:["png", "jpg", "jpeg"]
        })        
        if(!image) return{ message: "Invalid file" }
        await image.move(Application.tmpPath("images"))
        const newSchema= schema.create({
            event_id: schema.number([
               rules.exists({
                   table: 'events',
                   column:'id'
               }),
           ]),
           is_memory:schema.boolean()
           })
           var fields= await ctx.request.validate({schema: newSchema})
        var newImage = new Image()
        newImage.eventId= fields.event_id
        newImage.isMemory= fields.is_memory
        newImage.path= image["data"]["clientName"]
        await newImage.save()
        return{ message: "The image has been uploaded!" }
      }

      public async sendEmail(){
        const sgMail = require('@sendgrid/mail')
        sgMail.setApiKey('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')

        const msg = {
        to: 'mayachamj.gd27@gmail.com', // Change to your recipient
        from: 'info@walleterp.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        }

        sgMail
        .send(msg)
        .then((response) => {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
            console.error(error.response.body);

            console.log('not sent')
        })
      }
}
