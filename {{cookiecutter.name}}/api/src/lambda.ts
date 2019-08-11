"use strict";
import lambda from "aws-lambda";
import { createServer, proxy } from "aws-serverless-express";
import { app } from "./app";
import { Server } from "http";

export const handler = async (event: lambda.APIGatewayEvent, context: lambda.Context) => {
    const server = getServer();
    const proxyResult = proxy(server, event, context, "PROMISE");
    const response = await proxyResult.promise;
    
    console.log(response.statusCode);
};

let server: Server = null;

const getServer = () => {
    if (!server) {
        server = createServer(app);
    }

    return server;
};