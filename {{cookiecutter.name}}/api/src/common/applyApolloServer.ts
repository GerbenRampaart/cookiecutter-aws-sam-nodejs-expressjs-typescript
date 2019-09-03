import { ApolloServer } from "apollo-server-express";
import { context } from "../graphQL/context";
import { resolvers } from "../graphQL/resolvers/resolvers";
import { typeDefs } from '../graphQL/typeDefs';
import { ExpressServer } from "./expressServer";

export const applyApolloServer = (expressServer: ExpressServer): ApolloServer => {
  const server = new ApolloServer({
    typeDefs: typeDefs,
    context: context,
    resolvers: resolvers,
    debug: true,
    tracing: true,
    playground: true,
    introspection: true
  });
  
  server.applyMiddleware({
    app: expressServer.expressApplication
  });

  return server;
}
