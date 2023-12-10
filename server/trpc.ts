import { initTRPC } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { Todo, User } from './models';
import jwt from "jsonwebtoken"
import { secretKey } from './routers/user';


export const createContext = async (opts: CreateNextContextOptions) => {

    let authHeader = opts.req.headers["authorization"];

    if (authHeader) {
        let token = authHeader.split(" ")[1];
        const payload = jwt.verify(token, secretKey);
        if (!payload) {
            return {
                db: {
                    User: typeof User,
                    Todo: typeof Todo
                },
                //@ts-ignore
                userId: payload.userId
            }
        }
        return {
            db: {
                User: typeof User,
                Todo: typeof Todo
            },
        }

    }

    return {
        db: {
            User: typeof User,
            Todo: typeof Todo
        },
    }

};

const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;