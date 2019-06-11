'use strict'

import { Request, Response } from "express";
import express from "express";
import { eventContext } from "aws-serverless-express/middleware";
import bodyParser from "body-parser";
import { APIGatewayEvent, Context } from 'aws-lambda';

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

expressApp.post('/test-post', jsonParser, (req: Request, res: Response) => {
    res.json({
        "this-is-what-you-posted": req
    });
});

export const app = expressApp;