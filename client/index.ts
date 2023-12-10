import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server/index';




const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
      async headers(opts) {
        return {
          Authorization: "bearer 123"
        }
      },
    }),
  ],
});

async function main() {
  
const data=await trpc.userRouter.signup.mutate({
  email:"hello@gmail.com",
  password:"123456"
})
  
}

// async function main2(){
//   const data=await trpc.todoRouter.todoCreate.mutate({
//     title:"Just checking",
//     description:"All going good"
//   })

//   console.log(data);
  
// }


//main2()
main()