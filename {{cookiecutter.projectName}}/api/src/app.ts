'use strict'

import { Request, Response } from "express";
import express from "express";
import bodyParser from "body-parser";

const expressApp = express();

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const textParser = bodyParser.text();

const pets = [
    {
        id: 1,
        name: "dog"
    },
    {
        id: 2,
        name: "cat"
    }
];

expressApp.get('/pets', jsonParser, (req: Request, res: Response) => {
    res.json(pets);
});

expressApp.get('/pets/:petId', jsonParser, (req: Request, res: Response) => {
    res.json(pets.filter((pet) => {
        pet.id === req.params.petId
    }));
});

export const app = expressApp;