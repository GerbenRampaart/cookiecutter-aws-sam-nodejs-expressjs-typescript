import ExpressServer from './common/expressServer';

let portString: number | undefined = Number(process.env.PORT);
let port = 3000;

if (portString && !isNaN(portString)) {
  port = portString;
}

const app = new ExpressServer();
app.listen(port);
