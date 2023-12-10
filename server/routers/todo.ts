import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { Todo } from "../models";
import { isLoggedIn } from "../middleware/user";



export const TodoRouter = router({
    todoCreate: publicProcedure
        .input(z.object({
            title: z.string(),
            description: z.string(),
        })).use(isLoggedIn).mutation(async (opts) => {
            let title=opts.input.title
            let description=opts.input.description
            
            const todo=await Todo.create({
                title,
                description,
                done:false,
                id:opts.ctx.user?._id
            })

            return {
                msg:`Todo successfully created ${todo.id}`
            }
        })
})