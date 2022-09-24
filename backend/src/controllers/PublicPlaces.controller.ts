import { NextFunction, Request, Response } from 'express';
import IPublicPlace from '../interfaces/publicPlace.interface';
import PublicPlacesService from '../services/PublicPlaces.service';

class PublicPlaces {
  public service: PublicPlacesService;

  constructor() {
    this.service = new PublicPlacesService();
  }

  public getPublicPlaces = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const publicPlacesList: IPublicPlace[] | null = await this.service.getPublicPlaces();
      if (!publicPlacesList) return res.status(404).json({ message: 'Não encontramos logradouros.' })

      return res.status(200).json(publicPlacesList);
    } catch (error) {
      next(error);
    }
  };

  public createPublicPlace = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const publicPlace = req.body;

      const createdPublicPlace: IPublicPlace | null = await this.service.createPublicPlace(publicPlace);

      if (!createdPublicPlace) {
        return res.status(400)
          .json({ message: `Não foi possível criar o logradouro com os dados: ${publicPlace}` });
      }

      return res.status(201).json(createdPublicPlace);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public updatePublicPlace = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!req.body) return res.status(400).json({ message: 'Sem dado para atualizar' });

      const publicPlace = { ...req.body, id };
      
      await this.service.updatePublicPlace(publicPlace);
      
      return res.status(200).json(publicPlace);
    } catch (error) {
      next(error);
    }
  };

  public deletePublicPlace = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ message: 'Por favor, nos passe um identificador(id) para excluir.' });

      await this.service.deletePublicPlace(id);

      return res.status(202).json({ message: 'Registro excluído com sucesso.' });
    } catch (error) {
      next(error);
    }
  };
}

export default new PublicPlaces();
