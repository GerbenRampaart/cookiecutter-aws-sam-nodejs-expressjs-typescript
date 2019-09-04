import { ExpressServer } from './common/expressServer';
import { applyApolloServer } from './common/applyApolloServer';

let portString: number | undefined = Number(process.env.PORT);
let port = 3000;

if (portString && !isNaN(portString)) {
  port = portString;
}

const app = new ExpressServer();
applyApolloServer(app);

app.listen(port);
