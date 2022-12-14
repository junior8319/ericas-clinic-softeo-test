import express, { json, NextFunction, Request, Response } from 'express';
import attendancesRouter from '../routes/attendances.routes';
import {
  citiesRouter,
  countriesRouter,
  neighborhoodsRouter,
  publicPlacesRouter,
  rolesRouter,
  telephonesRouter,
  usersAddressesRouter,
  usersPhonesRouter,
  usersRouter
} from '../routes/index.routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.app.use(countriesRouter);
    this.app.use(rolesRouter);
    this.app.use(citiesRouter);
    this.app.use(neighborhoodsRouter);
    this.app.use(telephonesRouter);
    this.app.use(publicPlacesRouter);
    this.app.use(usersRouter);
    this.app.use(attendancesRouter);
    this.app.use(usersPhonesRouter);
    this.app.use(usersAddressesRouter);
    this.middlewares();

    this.app.get('/', (_req, res) => res.send('Hello, World!'));
  };

  private config():void {
    const accessControl: express.RequestHandler = (_req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
  }

  middlewares = () => {
    this.app.use(json());
  };

  listen = (port: number) => {
    this.app.listen(port, () => console.log(`Servidor rodando na porta: ${port}`));
  };
}

export default new App();
