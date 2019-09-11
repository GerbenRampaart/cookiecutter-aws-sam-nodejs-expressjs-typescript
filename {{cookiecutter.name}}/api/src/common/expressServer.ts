import * as express from "express";
import { join } from "path";
import { bodyParsers } from "./bodyParsers";
import { errorHandler } from "../middleware/errorHandler";
import { Application } from "express";
import { IController } from "./controller";
import * as helmet from "helmet";
import * as compression from "compression";
import * as morgan from "morgan";
import { PetsController } from '../controllers/pets/petsController';
import * as responseTime from "response-time";
import * as serveFavicon from "serve-favicon";
import { existsSync } from "fs";
import { environment, Mode } from '../environment';
import { Server } from "http";

export class ExpressServer {
  private app: Application;

  public get expressApplication(): Application {
    return this.app;
  }

  public controllers: IController[] = [
    new PetsController()
  ];

  constructor() {
    this.app = express();

    this.expressApplication.use(responseTime());
    this.expressApplication.use(bodyParsers());
    this.expressApplication.use(helmet());

    if (environment.mode === Mode.DEV) {
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
        this.expressApplication.use("*", (req: Request, res: Response) => {
          res.sendFile('index.html', {
            root: webDir
          });
        });
    */
    this.expressApplication.use(errorHandler);
  }

  public listen(port: number): Server {
    return this.expressApplication.listen(port, () => console.log(`Listening on ${port}`));
  }
}
