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
class App {
  public expressApplication: Application;

  constructor(controllers: IController[], NODE_ENV: string = 'development') {

    process.env.NODE_ENV = process.env.NODE_ENV || NODE_ENV;


    this.expressApplication = express();
    this.expressApplication.use(helmet());

    if (NODE_ENV === "development") {
      this.expressApplication.use(morgan('dev'));
    } else {
      this.expressApplication.use(morgan('combined'));
      this.expressApplication.use(compression());
    }

    this.expressApplication.use(envelope);
    this.expressApplication.use(bodyParsers());
    this.expressApplication.use("/", express.static(join(__dirname, "../", "web")));
    
    controllers.forEach(c => {
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

export default App;
