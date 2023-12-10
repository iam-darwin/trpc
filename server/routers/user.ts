import { User } from "../models";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const secretKey="TRPC"

export const UserRouter = router({
    signup: publicProcedure
        .input(
            z.object({
                email: z.string().min(5).max(20),
                password: z.string().min(5).max(500),
            })
        )
        .output(
            z.object({
                message: z.string(),
            })
        )
        .mutation(async (opts) => {
            
            let email = opts.input.email;
            let password = opts.input.password;

            let user = await User.create({
                email,
                password,
            });

            return {
                message: "successfully Created check db"
            }
        }),
    login: publicProcedure
        .input(z.object({
            email: z.string().min(5).max(20),
            password: z.string().min(5).max(500),
        })).output(z.object({
            token:z.string()
        })).mutation(async (opts)=>{

            const email=opts.input.email;

            const user=await User.findOne({
                email
            })
             //@ts-ignore
            const isPasswordValid = await bcrypt.compare(opts.input.password, user.password);
            const token= jwt.sign({
                userId:user?._id 
            },secretKey,{expiresIn:'1h'})
            return {
                token
            }
        }),
});
