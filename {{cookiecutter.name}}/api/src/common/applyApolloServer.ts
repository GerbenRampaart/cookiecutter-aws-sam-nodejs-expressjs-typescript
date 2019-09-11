import { ApolloServer } from "apollo-server-express";
import { environment } from '../environment';
import { resolvers } from "../graphQL/resolvers/resolvers";
import * as typeDefs from '../graphQL/schema.graphql';
import { ExpressServer } from "./expressServer";
import { OwnersService } from "../services/owners/ownersService";
import { PetsService } from "../services/pets/petsService";
import { Context } from '../graphQL/context';
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";

export const applyApolloServer = (expressServer: ExpressServer): ApolloServer => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: (req: ExpressContext): Context => {      
      return {} as Context;
    },
    dataSources: () => {
      return {
        ownersService: new OwnersService(),
        petsService: new PetsService()
      }
    },
    debug: environment.apollo.debug,
    tracing: environment.apollo.tracing,
    playground: environment.apollo.playground,
    introspection: environment.apollo.introspection
  });

  server.applyMiddleware({
    app: expressServer.expressApplication
  });

  return server;
}
