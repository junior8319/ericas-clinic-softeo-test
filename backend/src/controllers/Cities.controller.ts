import { NextFunction, Request, Response } from 'express';
import ICity from '../interfaces/city.interface';
import CitiesService from '../services/Cities.service';

class Cities {
  public service: CitiesService;

  constructor() {
    this.service = new CitiesService();
  }

  public getCities = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const citiesList: ICity[] | null = await this.service.getCities();
      if (!citiesList) return res.status(404).json({ message: 'Não encontramos cidades.' })

      return res.status(200).json(citiesList);
    } catch (error) {
      next(error);
    }
  };

  public createCity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const city = req.body;

      const createdCity: ICity | null = await this.service.createCity(city);

      if (!createdCity) {
        return res.status(400)
          .json({ message: `Não foi possível criar a cidade com os dados: ${city}` });
      }

      return res.status(201).json(createdCity);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public updateCity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!req.body) return res.status(400).json({ message: 'Sem dado para atualizar' });

      const city = { ...req.body, id };
      
      await this.service.updateCity(city);
      
      return res.status(200).json(city);
    } catch (error) {
      next(error);
    }
  };

  public deleteCity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      await this.service.deleteCity(id);

      return res.status(202).json({ message: 'Registro excluído com sucesso.' });
    } catch (error) {
      next(error);
    }
  };
}

export default new Cities();