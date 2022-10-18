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
      if (!phoneToCreate || Object.keys(phoneToCreate).length === 0) {
        return res.status(400)
        .json({ message: 'Nenhum dado recebido.' });
      }
      
      const { prefix, number, cityId } = phoneToCreate;
      this.prefix = phoneToCreate.prefix;
      if (!this.prefix || !Number(this.prefix)) return res.status(400)
        .json({ message: 'Prefixo do telefone não informado, informe "prefix"' });

      this.number = phoneToCreate.number;
      if (!this.number || !Number(this.number)) return res.status(400)
        .json({ message: 'Número do telefone não informado, informe "number"' });

      this.cityId = cityId;
      if (!this.cityId || !Number(this.cityId)) return res.status(400)
        .json({ message: 'É necessário informar o id da cidade, informe "cityId"' });

      const phoneExists = await TelephonesService.telephoneExists(prefix, number, cityId);
      if (phoneExists) return res.status(400)
        .json({ message: `Já existe número de telefone com os dados: ${phoneToCreate}` });
  
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public validateUpdatePhone = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const phoneToUpdate = req.body;
      const { prefix, number, cityId } = phoneToUpdate;

      if (!phoneToUpdate || !prefix && !number && !cityId) return res.status(400)
        .json({ message: 'Sem dado para atualizar' });

      const { id } = req.params;
      if (!id || !Number(id)) return res.status(400)
        .json({
          message:
            'Por favor, nos passe um identificador(id) numérico para atualizar.',
        });

      const foundPhone = await TelephonesService.getPhoneById(Number(id));
      if (!foundPhone) return res.status(400)
        .json({
          message:
          `Identificador informado (id: ${id}) não encontrado` +
          ' Favor informar id válido',
        });

      if (!prefix || !number || !cityId) return next();
      const phoneExists = await TelephonesService.telephoneExists(prefix, number, cityId);
      if (phoneExists) return res.status(400)
        .json({ message: `Já existe telefone com os dados ${phoneToUpdate}` });

      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public validateDeletePhone = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!id || !Number(id)) return res.status(400)
        .json({
          message:
            'Por favor, nos passe um identificador (id) numérico para excluir.'
        });
      
      const foundPhone = await TelephonesService.getPhoneById(Number(id));
      if (!foundPhone) return res.status(400)
        .json({
          message:
            `Identificador (id: ${id} não encontrado.` +
            ' Favor informar id válido para excluir.',
        });
      
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default new TelephonesMiddleware();
