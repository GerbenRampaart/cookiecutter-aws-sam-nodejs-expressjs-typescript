import * as express from "express";
import { join } from "path";
import initializeBodyParser from "./bodyParser";
import errorMiddleware from "../middleware/error";
import { Application } from "express";
import IController from "./controller";
import envelope from "./envelope";


class App {
  public expressApplication: Application;

  constructor(controllers: IController[]) {
    this.expressApplication = express();


    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling(); 
    this.expressApplication.use(envelope);
    
  }

  private initializeMiddlewares() {
    initializeBodyParser(this.expressApplication);
    this.initializeStatic();
  }

  private initializeErrorHandling() {
    this.expressApplication.use(errorMiddleware);
  }
  
  private initializeStatic() {
    this.expressApplication.use("/", express.static(join(__dirname, "../", "web")));
  }

  private initializeControllers(controllers: IController[]) {
    controllers.forEach(c => {
      this.expressApplication.use('/api', c.router);
    });
  }

  public listen(port: number) {
    this.expressApplication.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  }
}

export default App;



//export default expressApp;
