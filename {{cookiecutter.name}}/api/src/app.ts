"use strict";

import * as express from "express";
import { join } from "path";
import bodyParser from "./bodyParser";
import PetsService from "./services/pet/pet.service";

const expressApp = express();
bodyParser(expressApp);

expressApp.get("/api/pets", async (req: express.Request, res: express.Response) => {
    const all = await PetsService.all();
    res.json(all.filter((pet) => 
    pet.id === req.params.petId));
});

expressApp.get("/api/pets/:petId", async (req: express.Request, res: express.Response) => {
    res.json(
        PetsService.byFilter((pet) => 
            pet.id === req.params.petId;
        )
    );
});

expressApp.use("/", express.static(join(__dirname, "../", "web")));

export const app = expressApp;
