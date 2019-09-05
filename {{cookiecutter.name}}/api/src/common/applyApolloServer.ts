import { ApolloServer } from "apollo-server-express";
import { resolvers } from "../graphQL/resolvers/resolvers";
import { typeDefs } from '../graphQL/typeDefs';
import { ExpressServer } from "./expressServer";
import { OwnersService } from "../services/owners/ownersService";
import { PetsService } from "../services/pets/petsService";
import { Context } from "../graphQL/context";

export const applyApolloServer = (expressServer: ExpressServer): ApolloServer => {
  const server = new ApolloServer({
    typeDefs: typeDefs,
    context: {} as Context,
    resolvers: resolvers,
    dataSources: () => {
      return {
        ownersService: new OwnersService(),
        petsService: new PetsService()
      }
    },
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
