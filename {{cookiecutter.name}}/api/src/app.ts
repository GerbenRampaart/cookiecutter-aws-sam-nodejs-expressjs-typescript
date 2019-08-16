import * as express from "express";
import { join } from "path";
import initializeBodyParser from "./bodyParser";
import ps from "./services/pets/service";
import errorMiddleware from "./middleware/error";

class ExpressApp {
  public app: express.Application;
  public port: number;

  constructor(controllers, port) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling(); // last
  }

  private initializeMiddlewares() {
    initializeBodyParser(this.app);
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
  
  private initializeControllers(controllers) {
    controllers.forEach(c => {
      this.app.use('/', c.router)
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
    });
  }
}

export default ExpressApp;

expressApp.use("/", express.static(join(__dirname, "../", "web")));

//export default expressApp;
