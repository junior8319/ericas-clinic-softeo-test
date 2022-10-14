import express, { NextFunction, Request, Response } from 'express';
import TelephonesService from '../services/Telephones.service';

class TelephonesMiddleware {
  public app: express.Application;

  public service: TelephonesService;

  public prefix!: number;

  public number!: number;

  public cityId!: number;

  constructor() {
    this.app = express();
    this.service = new TelephonesService();
  }

  public validateCreatePhone = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const phoneToCreate = req.body;
      const { prefix, number, cityId } = phoneToCreate;
      const phoneExists = await TelephonesService.telephoneExists(prefix, number, cityId);

      if (phoneExists) return res.status(400)
        .json({ message: `Já existe número de telefone com os dados: ${phoneToCreate}` });

      if (!phoneToCreate) return res.status(400)
        .json({ message: 'Nenhum dado recebido.' });

      this.prefix = phoneToCreate.prefix;
      if (!this.prefix || !Number(this.prefix)) return res.status(400)
        .json({ message: 'Prefixo do telefone não informado, informe "prefix"' });

      this.number = phoneToCreate.number;
      if (!this.number || !Number(this.number)) return res.status(400)
        .json({ message: 'Número do telefone não informado, informe "number"' });

      this.cityId = cityId;
      if (!this.cityId || !Number(this.cityId)) return res.status(400)
        .json({ message: 'É necessário informar o id da cidade, informe "cityId"' });

      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default TelephonesMiddleware;
