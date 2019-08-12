import * as express from "express";
import { join } from "path";
import bp from "./bodyParser";
import ps from "./services/pet/pet.service";

const expressApp = express();
bp(expressApp);

expressApp.get(
  "/api/pets",
  async (req: express.Request, res: express.Response) => {
    const all = await ps.all();
    res.json(all);
  }
);

interface GetById {
  petId: number;
}

expressApp.get(
  "/api/pets/:petId",
  async (req: express.Request, res: express.Response) => {
    const params = req.params as GetById;

    if (!params) {
      res.status(400).end("id undefined");
    }
    console.log(params);

    res.json(
      await ps.byFilter(pet => {
        console.log(pet.id, params.petId);
        return pet.id === params.petId;
      })
    );
  }
);

expressApp.use("/", express.static(join(__dirname, "../", "web")));

export default expressApp;
