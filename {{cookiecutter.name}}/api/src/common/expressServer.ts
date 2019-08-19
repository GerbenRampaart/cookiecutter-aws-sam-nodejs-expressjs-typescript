import * as express from "express";
import { join } from "path";
import { bodyParsers } from "./bodyParsers";
import errorMiddleware from "../middleware/error";
import { Application } from "express";
import IController from "./controller";
import envelope from "./envelope";
import * as helmet from "helmet"; // Security
import * as compression from "compression";
import * as morgan from "morgan";
import PetsController from '../controllers/pets/petsController';
import * as responseTime from "response-time";
import * as serveFavicon from "serve-favicon";
import { existsSync } from "fs";

class ExpressServer {
  public expressApplication: Application;
  public controllers: IController[] = [
    new PetsController()
  ];
  
  constructor(NODE_ENV: "development" | "production" = "development") {

    process.env.NODE_ENV = process.env.NODE_ENV || NODE_ENV;

    this.expressApplication = express();
    this.expressApplication.use(helmet());
    this.expressApplication.use(responseTime());
    

    if (NODE_ENV === "development") {
      this.expressApplication.use(morgan('dev'));
    } else {
      this.expressApplication.use(morgan('combined'));
      this.expressApplication.use(compression());
    }

    this.expressApplication.use(envelope);
    this.expressApplication.use(bodyParsers());

    const webDir = join(__dirname, "../", "web");
    const favIconPath = join(webDir, "favicon.ico");

    this.expressApplication.use("/", express.static(webDir));

    if (existsSync(favIconPath)) {
      this.expressApplication.use(serveFavicon(favIconPath));
    }

    this.controllers.forEach(c => {
      this.expressApplication.use('/api', c.router);
    });

    this.expressApplication.use(errorMiddleware);
    
    
  }

  public listen(port: number) {
    this.expressApplication.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  }
}

export default ExpressServer;
