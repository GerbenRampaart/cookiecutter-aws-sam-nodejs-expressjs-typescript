"use strict";
import lambda from "aws-lambda";
import { createServer, proxy, Response } from "aws-serverless-express";
import { app } from "./app";

const server = createServer(app);

export const handler = (event: lambda.APIGatewayEvent, context: lambda.Context) => {
    return proxy(server, event, context);
};