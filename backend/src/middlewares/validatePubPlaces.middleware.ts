import PublicPlacesService from '../services/PublicPlaces.service';
import express, { NextFunction, Request, Response } from 'express';

class PublicPlacesMiddleware {
  public app: express.Application;

  public service: PublicPlacesService;

  public id!: number;

  public neighborhoodId!: number;

  public type!: string;

  public name!: string;

  constructor() {
    this.app = express();
    this.service = new PublicPlacesService();
  }

  public validateCreatePublicPlace = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const publicPlaceToCreate = req.body;
      if (
        !publicPlaceToCreate ||
        Object.keys(publicPlaceToCreate).length === 0
      ) {
        return res.status(400).json({ message: 'Nenhum dado recebido.' });
      }

      const { name, type, neighborhoodId } = publicPlaceToCreate;

      this.neighborhoodId = Number(neighborhoodId);
      if (!this.neighborhoodId || !Number(this.neighborhoodId)) {
        return res.status(400)
          .json({
            message:
              'Você deve informar o bairro (neighborhoodId) onde' +
              ' se localiza o logradouro (rua, av., etc.).'
          });
      }

      this.name = name;
      if (!this.name || this.name.length === 0) return res.status(400)
        .json({ message: 'Você deve informar o nome (name) do logradouro.' });
      
      this.type = type;
      if (!this.type || this.type.length === 0) return res.status(400)
        .json({
          message:
            'Você deve informar o tipo (type) de logradouro (rua, av., etc.).'
        });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default new PublicPlacesMiddleware();
