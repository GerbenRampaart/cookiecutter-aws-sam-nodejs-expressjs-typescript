"use strict";

import bodyParser from "body-parser";
import { Request, Response } from "express";
import express from "express";

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

expressApp.get("/api/pets", jsonParser, (req: Request, res: Response) => {
    res.json(pets);
});

expressApp.get("/api/pets/:petId", jsonParser, (req: Request, res: Response) => {
    res.json(pets.filter((pet) => {
        return pet.id === req.params.petId;
    }));
});

expressApp.use(express.static("web"));

export const app = expressApp;
