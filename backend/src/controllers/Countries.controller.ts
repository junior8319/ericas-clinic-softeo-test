import { NextFunction, Request, Response } from "express";
import CountriesService from "../services/Countries.service";
import errorMiddleware from "../middlewares/error.middleware";
import ICountry from "../interfaces/country.interface";

class Countries {
  public service: CountriesService;

  constructor() {
    this.service = new CountriesService();
  }

  public getCountries = async (_req: Request, res: Response, _next: NextFunction) => {
    try {
      const countriesList: ICountry[] | null = await this.service.getCountries();
      if (!countriesList) return res.status(404).json({ message: 'Não encontramos países.' })

      return res.status(200).json(countriesList);
    } catch (error) {
      errorMiddleware.handleErrors();
    }
  };

  public createCountry = async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const country = req.body;

      const createdCountry: ICountry | null = await this.service.createCountry(country);

      if (!createdCountry) {
        return res.status(400)
          .json({ message: `Não foi possível criar o país com os dados: ${country}` });
      }

      return res.status(201).json(createdCountry);
    } catch (error) {
      console.log(error);
      return errorMiddleware.handleErrors();
    }
  };
}

export default new Countries();