import express, { Request, Response } from 'express';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    // this.app.use(); // here goes the routers of this backend project
    this.app.get('/', (_req: Request, res: Response) => res.send('It works if you\'re seeing this' ))
  }

  public start = (PORT: string | number):void => {
    try {
      this.app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
      console.log(error);
    }
  };
}

export { App };