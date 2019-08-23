import * as express from "express";
import { join } from "path";
import { bodyParsers } from "./bodyParsers";
import errorHandler from "../middleware/errorHandler";
import { Application } from "express";
import IController from "./controller";
// import envelope from "./envelope";
import * as helmet from "helmet"; // Security
import * as compression from "compression";
import * as morgan from "morgan";
import PetsController from '../controllers/pets/petsController';
import * as responseTime from "response-time";
import * as serveFavicon from "serve-favicon";
import { existsSync } from "fs";
//import { petsSchema } from "../controllers/graphQL/petsSchema";


class ExpressServer {
  public expressApplication: Application;
  public controllers: IController[] = [
    new PetsController()
  ];

  constructor(NODE_ENV: "development" | "production" = "development") {

    process.env.NODE_ENV = process.env.NODE_ENV || NODE_ENV;

    this.expressApplication = express();
    this.expressApplication.use(responseTime());
    //this.expressApplication.use(envelope);    
    this.expressApplication.use(bodyParsers());
    this.expressApplication.use(helmet());

    if (NODE_ENV === "development") {
      this.expressApplication.use(morgan('dev'));
    } else {
      this.expressApplication.use(morgan('combined'));
      this.expressApplication.use(compression());
    }

    const webDir = join(__dirname, "../", "web");
    const favIconPath = join(webDir, "favicon.ico");
    this.expressApplication.use("/", express.static(webDir));

    if (existsSync(favIconPath)) {
      this.expressApplication.use(serveFavicon(favIconPath));
    }

    this.controllers.forEach(c => {
      this.expressApplication.use('/api', c.router);
    });
/*
    this.expressApplication.use("/api/graphiql", GraphQLHTTP({
      schema: petsSchema,
      graphiql: true
    }));

    this.expressApplication.use("*", (req: Request, res: Response) => {
      res.sendFile('index.html', {
        root: webDir
      });
    });
*/
    this.expressApplication.use(errorHandler);
  }

  public listen(port: number) {
    this.expressApplication.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  }
}

//export default ExpressServer;


import { GraphQLServerLambda } from 'graphql-yoga'

const typeDefs = `
  type Query {
    hello(name: String): String
  }
`

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'world'}`,
  },
}

const lambda = new GraphQLServerLambda({
  typeDefs,
  resolvers,
})

export const server = lambda.graphqlHandler