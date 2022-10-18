import express, { NextFunction, Request, Response } from 'express';
import NeighborhoodsService from '../services/Neighborhoods.service';

class NeighborhoodsMiddleware {
  public app: express.Application;

  public service: NeighborhoodsService;

  public name!: string;

  public cityId!: number;

  public id!: number;

  constructor() {
    this.app = express();
    this.service = new NeighborhoodsService();
  }

  public validateCreateNeighborhood = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const neighborhoodToCreate = req.body;
      if (
        !neighborhoodToCreate ||
        Object.keys(neighborhoodToCreate).length === 0
      ) {
        return res.status(400).json({ message: 'Nenhum dado recebido.' });
      }

      const { name, cityId } = neighborhoodToCreate;

      this.name = name;
      if (!this.name || this.name.length === 0) return res.status(400)
        .json({ message: 'Você deve informar o nome do bairro ("name")' });

      this.cityId = cityId;
      if (!this.cityId || !Number(this.cityId)) return res.status(400)
        .json({
          message:
            'Você deve informar a cidade onde se localiza ("cityId") o bairro.'
        });

      const neighborhoodExists = await NeighborhoodsService
        .neighborhoodExists(this.name, this.cityId);
      if (neighborhoodExists) return res.status(400)
        .json({
          message:
            `Já existe bairro com o nome com os dados: ${neighborhoodToCreate}`
        });

      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public validateUpdateNeighborhood = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const neighborhoodToUpdate = req.body;
      const { name, cityId } = neighborhoodToUpdate;

      if (!neighborhoodToUpdate || !name && !cityId) return res.status(400)
        .json({ message: 'Sem dado para atualizar.' });
      
      const { id } = req.params;
      if (!id || !Number(id)) return res.status(400)
        .json({
          message:
            'Por favor, nos informe um identificador (id) numérico para atualizar.',
        });
      
      this.id = Number(id);
      const foundNeighborhood = await NeighborhoodsService.getById(this.id);
      if (!foundNeighborhood) return res.status(400)
        .json({
          message:
            `Identificador informado (id: ${id}) não encontrado` +
            ' Favor informar id válido',
        });

      if (!name || !cityId) return next();
      const neighborhoodExists = await NeighborhoodsService.neighborhoodExists(name, cityId);
      if (neighborhoodExists) return res.status(400)
        .json({
          message: 'Já existe registro com esses dados, verifique por favor.',
      });

      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default new NeighborhoodsMiddleware();
