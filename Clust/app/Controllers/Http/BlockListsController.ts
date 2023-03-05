import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import BlockList from 'App/Models/BlockList'
export default class BlockListsController {
    
    public async get(/*ctx: HttpContextContract*/){
        var result = BlockList.all()
        return result
    }

    public async getById(ctx: HttpContextContract){
        var id= ctx.params.id
        var result = BlockList.findOrFail(id)
        return result
    }


    public async create(ctx: HttpContextContract){
       const newSchema= schema.create({
        user_id: schema.number([
            // rules.exists({
            //     table: 'users',
            //     column:'id'
            // })
        ]),
        blocked_id: schema.number([
            // rules.exists({
            //     table: 'users',
            //     column:'id'
            // })
        ])
       })
       var fields= await ctx.request.validate({schema: newSchema})
       var blockList= new BlockList()
       blockList.userId= fields.user_id
       blockList.blockedId= fields.blocked_id
       var result= await blockList.save()
       return result
    }

    public async update(ctx: HttpContextContract){
       const newSchema= schema.create({
        user_id: schema.number([
            // rules.exists({
            //     table: 'users',
            //     column:'id'
            // })
        ]),
        blocked_id: schema.number([
            // rules.exists({
            //     table: 'users',
            //     column:'id'
            // })
        ]),
        id: schema.number()
       })
       var fields= await ctx.request.validate({schema: newSchema})
       var blockList=  await BlockList.findOrFail(fields.id)
       blockList.userId= fields.user_id
       blockList.blockedId= fields.blocked_id
       var result= await blockList.save()
       return result
    }

    public async destroy(ctx: HttpContextContract){
        try{
            var id = ctx.params.id;
            var  blockList = await  BlockList.findOrFail(id);
            try{
            await  blockList.delete();
            return { message: "The  blockList has been deleted!" }
            }
            catch(e: unknown){
              return  { message: "Cannot delete a used foreign key :(" }
            }
            }
            catch(e:unknown){
                return { message: "BlockList not found :(" }
            }
    }
}