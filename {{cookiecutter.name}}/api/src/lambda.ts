import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { createServer, proxy } from "aws-serverless-express";
import { Server } from "http";
import expressApp from "./app";
import lambda from 'aws-lambda';

let server: Server | undefined;

const getServer = () => {
  if (!server) {
    server = createServer(expressApp);
  }

  return server;
};

const handler = async (event: APIGatewayProxyEvent, context: Context) => {
  const s = getServer();
  const proxyResult = proxy(s, event, context, "PROMISE");
  const response = await proxyResult.promise;

  console.log(response.statusCode);
};

export default handler;


kubernetes 
lambda
etag