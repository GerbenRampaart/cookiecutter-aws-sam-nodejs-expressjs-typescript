import PetsController from "./controllers/pets/petsController";
import App from "./common/app";

const port = 3000;

const app = new App([
  new PetsController()
]);

app.listen(port);
