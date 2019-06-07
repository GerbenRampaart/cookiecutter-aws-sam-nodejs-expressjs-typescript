'use strict'

import { ApiSpecificationConverter } from './convert';
import { Request, Response } from "express";
import express from "express";
import { eventContext } from "aws-serverless-express/middleware";
import { join } from "path";
import bodyParser from "body-parser";
import { APIGatewayEvent, Context } from 'aws-lambda';
import { NextFunction } from 'connect';

interface IApiGateWayRequest extends Request {
    apiGateWay: {
        event: APIGatewayEvent, 
        context: Context
    }
}

const expressApp = express();

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const textParser = bodyParser.text();

expressApp.use(eventContext());

expressApp.get('/gateway', (req: Request, res: Response) => {
    let gatewayRequest: IApiGateWayRequest = req as any;
    console.log(gatewayRequest);
    res.json(gatewayRequest.apiGateWay);
  }
)

expressApp.post('/convert', textParser, (req: Request, res: Response) => {
    ApiSpecificationConverter.raml10ToOAS30(req.body).then((val: any) => {
        res.json(val);
    });
});

export const app = expressApp;