"use strict";

import * as bodyParser from "body-parser";
import * as express from "express";

const expressApp = express();

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const textParser = bodyParser.text();

const pets = [
    {
        id: 1,
        name: "dog",
    },
    {
        id: 2,
        name: "cat",
    },
];

expressApp.get("/pets", jsonParser, (req: express.Request, res: express.Response) => {
    res.json(pets);
});

expressApp.get("/pets/:petId", jsonParser, (req: express.Request, res: express.Response) => {
    res.json(pets.filter((pet) => {
        return pet.id === req.params.petId;
    }));
});

app.get('/', (req, res) => {
    res.sendFile(`web/index.html`)
})


expressApp.use(express.static("web"));

export const app = expressApp;
