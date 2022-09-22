import { NextFunction, Request, Response } from 'express';
import INeighborhood from '../interfaces/neighborhood.interface';
import NeighborhoodsService from '../services/Neighborhoods.service';

class Neighborhoods {
  public service: NeighborhoodsService;

  constructor() {
    this.service = new NeighborhoodsService();
  }

  public getNeighborhoods = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const neighborhoodsList: INeighborhood[] | null = await this.service.getNeighborhoods();
      if (!neighborhoodsList) return res.status(404).json({ message: 'Não encontramos bairros.' })

      return res.status(200).json(neighborhoodsList);
    } catch (error) {
      next(error);
    }
  };

  public createNeighborhood = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const neighborhood = req.body;

      const createdNeighborhood: INeighborhood | null = await this.service.createNeighborhood(neighborhood);

      if (!createdNeighborhood) {
        return res.status(400)
          .json({ message: `Não foi possível criar o bairro com os dados: ${neighborhood}` });
      }

      return res.status(201).json(createdNeighborhood);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public updateNeighborhood = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!req.body) return res.status(400).json({ message: 'Sem dado para atualizar' });

      const neighborhood = { ...req.body, id };
      
      await this.service.updateNeighborhood(neighborhood);
      
      return res.status(200).json(neighborhood);
    } catch (error) {
      next(error);
    }
  };

  public deleteNeighborhood = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ message: 'Por favor, nos passe um identificador(id) para excluir.' });

      await this.service.deleteNeighborhood(id);

      return res.status(202).json({ message: 'Registro excluído com sucesso.' });
    } catch (error) {
      next(error);
    }
  };
}

export default new Neighborhoods();