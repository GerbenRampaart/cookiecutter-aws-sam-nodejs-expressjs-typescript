import { ExpressServer } from './common/expressServer';
import { applyApolloServer } from './common/applyApolloServer';
import { environment } from './environment';

const app = new ExpressServer();
applyApolloServer(app);
app.listen(environment.port);
