import { NextFunction, Request, Response } from 'express';
import TelephonesService from '../services/Telephones.service';
import ITelephone from '../interfaces/telephone.interface';

class Telephones {
  public service: TelephonesService;

  constructor() {
    this.service = new TelephonesService();
  }

  public getTelephones = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const telephonesList: ITelephone[] | null = await this.service.getTelephones();
      if (!telephonesList) return res.status(404).json({ message: 'Não encontramos telefones.' });

      return res.status(200).json(telephonesList);      
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public createTelephone = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const telephone = req.body;

      const createdTelephone: ITelephone | null = await this.service.createTelephone(telephone);

      if (!createdTelephone) {
        return res.status(400)
          .json({ message: `Não foi possível criar o telephone com os dados: ${telephone}` });
      }

      return res.status(201).json(createdTelephone);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public updateTelephone = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!req.body) return res.status(400).json({ message: 'Sem dado para atualizar' });

      const telephone = { ...req.body, id };

      await this.service.updateTelephone(telephone);

      return res.status(200).json(telephone);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public deleteTelephone = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ message: 'Por favor, nos passe um identificador(id) para excluir.' });

      await this.service.deleteTelephone(id);

      return res.status(202).json({ message: 'Registro excluído com sucesso.' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default new Telephones();
