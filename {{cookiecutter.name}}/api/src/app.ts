"use strict";

import * as express from "express";
import { join } from "path";
import bodyParser from "./bodyParser";

const expressApp = express();
bodyParser(expressApp);

expressApp.get("/api/pets", async (req: express.Request, res: express.Response) => {
    res.json(PetsService);
});

expressApp.get("/api/pets/:petId", jsonParser, async (req: express.Request, res: express.Response) => {
    res.json(
        pets.filter((pet) => {
            return pet.id === req.params.petId;
        })
    );
});

expressApp.use("/", express.static(join(__dirname, "../", "web")));

export const app = expressApp;
