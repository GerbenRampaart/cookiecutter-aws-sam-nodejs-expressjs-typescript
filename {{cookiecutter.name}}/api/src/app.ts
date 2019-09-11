import { ExpressServer } from './common/expressServer';
import { applyApolloServer } from './common/applyApolloServer';
import { environment } from './environment';

const app = new ExpressServer();
applyApolloServer(app);
const server = app.listen(environment.port);

// https://medium.com/@edward17/node-js-typescript-webpack-js-hot-module-replacement-express-js-8d92dad60119
declare const module: any;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}
