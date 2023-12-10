import { User } from "../models";
import { middleware } from "../trpc";
import { TRPCError } from '@trpc/server';

export const isLoggedIn=middleware(async (opts)=>{
    const {ctx}=opts
    
    if(!ctx.userId){
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    let user = await User.findOne({ id:ctx.userId})

    return opts.next({
        ctx:{
            user
        }
    })
})