// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Image from 'App/Models/Image'
// import {schema,rules} from '@ioc:Adonis/Core/Validator'



// export default class ImagesController {

//     public async get(){
//         var result = Image.all()
//         return result
//     }

//     public async getById(ctx: HttpContextContract){
//         var id= ctx.params.id
//         var result = Image.findOrFail(id)
//         return result
//     }

    
//     public async create(ctx: HttpContextContract){

//         // @column({ isPrimary: true })
//         // public id: number
      
//         // @column({serializeAs:"path"})
//         // public path: string
      
//         // @column({serializeAs:"event_id"})
//         // public eventId: number
      
//         // @column({serializeAs:"is_memory"})
//         // public isMemory: boolean
      

//         const newSchema= schema.create({

//          path: schema.string(),
//          event_id: schema.number([
//             rules.exists({
//                 table: 'events',
//                 column:'id'
//             }),
//         ]),
//         is_memory:schema.boolean()
//         })
//         var fields= await ctx.request.validate({schema: newSchema})
//         var image= new Image()
//         image.path= fields.path
//         var result= await image.save()
//         return result
//      }
     
//     public async update(ctx: HttpContextContract){
//         const newSchema= schema.create({
//          name: schema.string(),
//          id: schema.number()
//         })
//         var fields= await ctx.request.validate({schema: newSchema})
//         var image=  await Image.findOrFail(fields.id)
//         image.name= fields.name
//         var result= await image.save()
//         return result
//      }

//      public async destroy(ctx: HttpContextContract){
//         try{
//             var id = ctx.params.id;
//             var  image = await  Image.findOrFail(id);
//             try{
//             await  image.delete();
//             return { message: "The  image has been deleted!" }
//             }
//             catch(e: unknown){
//               return  { message: "Cannot delete a used foreign key ;(" }
//             }
//             }
//             catch(e:unknown){
//                 return { message: "Image not found ;(" }
//             }
//     }
// }