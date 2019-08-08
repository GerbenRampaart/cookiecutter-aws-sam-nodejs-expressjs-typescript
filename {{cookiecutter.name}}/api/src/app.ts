"use strict";

import * as express from "express";
import { join } from "path";

import { IncomingMessage, ServerResponse } from "http";

const expressApp = express();
const textParser = text({});

expressApp.get("/api/pets", json(), async (req: express.Request, res: express.Response) => {
    res.json(pets);
});

expressApp.get("/api/pets/:petId", jsonParser, async (req: express.Request, res: express.Response) => {
    res.json(
        pets.filter(pet => {
            return pet.id === req.params.petId;
        }),
    );
});

expressApp.use("/", express.static(join(__dirname, "../", "web")));

export const app = expressApp;
