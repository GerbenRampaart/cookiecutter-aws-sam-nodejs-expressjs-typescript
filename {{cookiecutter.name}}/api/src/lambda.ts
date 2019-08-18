import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { createServer, proxy } from "aws-serverless-express";
import { Server } from "http";
import App from "./common/app";
import PetsController from "./controllers/pets/petsController";

let server: Server | undefined;

const getServer = () => {
  if (!server) {
    const app = new App([
      new PetsController()
    ]);
    server = createServer(app.expressApplication);
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