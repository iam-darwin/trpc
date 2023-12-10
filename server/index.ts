import { router } from "./trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { dbConnect } from "./config/db";
import { createContext } from "./trpc";
import {  UserRouter} from "./routers/user"
import { TodoRouter } from "./routers/todo";


dbConnect();


const appRouter = router({
    userRouter:UserRouter,
    todoRouter:TodoRouter
})

export type AppRouter = typeof appRouter;


const server = createHTTPServer({
  router: appRouter,
  createContext
});

server.listen(3000);


