import * as express from "express";
import { join } from "path";
import { bodyParsers } from "./bodyParsers";
import errorHandler from "../middleware/errorHandler";
import { Application } from "express";
import IController from "./controller";
import * as helmet from "helmet";
import * as compression from "compression";
import * as morgan from "morgan";
import PetsController from '../controllers/pets/petsController';
import * as responseTime from "response-time";
import * as serveFavicon from "serve-favicon";
import { existsSync, readFileSync } from "fs";
import { ApolloServer } from "apollo-server-express";
import { context } from "../graphQL/context";
import { resolvers } from "../graphQL/resolvers/resolvers";

export enum Mode {
  DEV, PRD
}

class ExpressServer {
  private app: Application;

  public get expressApplication(): Application {
    return this.app;
  }

  public controllers: IController[] = [
    new PetsController()
  ];

  constructor(public mode: Mode = Mode.DEV) {
    this.app = express();

    this.expressApplication.use(responseTime());
    this.expressApplication.use(bodyParsers());
    this.expressApplication.use(helmet());

    if (mode === Mode.DEV) {
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

    const typeDefs = readFileSync(join(__dirname, "graphql", "schema.graphql"), { encoding: "utf-8" });

    const server = new ApolloServer({
      typeDefs: typeDefs,
      context: context,
      resolvers: resolvers,
      debug: true,
      tracing: true

    });

    server.applyMiddleware({
      app: this.expressApplication
    });

  }

  public listen(port: number) {
    this.expressApplication.listen(port, () => console.log(`Listening on ${port}`));
    // const basePath = "/graphql";
    /*
    this.graphQLApplication.start({
      port: port,
      endpoint: basePath,
      playground: `${basePath}/pg`,
      subscriptions: {
        path: `${basePath}/ws`
      },
      tracing: (this.mode === Mode.DEV),
      debug: (this.mode === Mode.DEV)
    }, () => {
      console.log(`App listening on port ${port}`);
    });*/
  }
}

export default ExpressServer;
