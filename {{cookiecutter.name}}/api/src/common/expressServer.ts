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
import { existsSync } from "fs";
import { GraphQLServer } from "graphql-yoga";
import { petsSchema } from "../graphQL/schema";

export enum Mode {
  DEV, PRD
}

class ExpressServer {
  public get expressApplication(): Application {
    return this.graphQLApplication.express;
  }
  
  private graphQLApplication: GraphQLServer;

  public controllers: IController[] = [
    new PetsController()
  ];

  constructor(public mode: Mode = Mode.DEV) {
    // https://github.com/prisma/graphql-yoga
    this.graphQLApplication = new GraphQLServer(
      {
        schema: petsSchema
      });

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
  }

  public listen(port: number) {
    const basePath = "/graphql";
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
    });
  }
}

export default ExpressServer;
