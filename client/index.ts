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
  const data = await trpc.createTodo.mutate({
    title: "Hello world",
    description: "What's the point if you don't go to gym"
  })
  console.log(data);
}

main()