"use strict";
import lambda from "aws-lambda";
import { createServer, proxy, Response } from "aws-serverless-express";
import { app } from "./app";

const server = createServer(app);

export const handler = async (event: lambda.APIGatewayEvent, context: lambda.Context) => {
    await proxy(server, event, context, "PROMISE");
};
