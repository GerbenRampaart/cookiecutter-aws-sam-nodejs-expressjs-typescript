import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { createServer, proxy } from "aws-serverless-express";
import { Server } from "http";
import { ExpressServer } from './common/expressServer';
import { applyApolloServer } from './common/applyApolloServer';

let server: Server | undefined;

const getServer = (): Server => {
  if (!server) {
    const app = new ExpressServer();
    applyApolloServer(app);
    server = createServer(app.expressApplication);
  }

  return server!;
};

const handler = async (event: APIGatewayProxyEvent, context: Context) => {
  const s = getServer();
  const proxyResult = proxy(s, event, context, "PROMISE");
  const response = await proxyResult.promise;

  console.log(response.statusCode);
};

export default handler;