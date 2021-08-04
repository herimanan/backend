import { ApolloServer } from "apollo-server";
import { context, redis } from "./Context";
import { schema } from "./Nexus";

export const server = new ApolloServer({
  schema,
  context,
  subscriptions: {
    path: "/",
    onConnect: async (connectionParams: any, __, _context) => {
      const userId = await redis.get(connectionParams.authToken);
      const ip = _context.request.socket.remoteAddress;
      if (connectionParams.authToken) {
        redis.set(`user:${userId}:lastSeen`, 0);
        return { userId, ip };
      }
    },
  },
  playground: true,
});

server.listen().then(({ url }) => {
  console.log(`🚀🚀 server listening at ${url}`);
});
