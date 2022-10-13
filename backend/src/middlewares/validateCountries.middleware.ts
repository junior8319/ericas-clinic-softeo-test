import express, { NextFunction, Request, Response } from 'express';
import CountriesService from '../services/Countries.service';

class CountriesMiddleware {
  public app: express.Application;
  public service: CountriesService;


  public name!: string;

  public phoneCode!: string;

  public continent!: string;

  constructor() {
    this.app = express();
    this.service = new CountriesService();
  }

  public validateCreateCountry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const countryToCreate = req.body;
      const { name } = countryToCreate;
      const countryExists = await CountriesService.countryExists(name);
      if (countryExists) return res.status(400)
        .json({ message: `Já existe país com o nome ${name}` });

      if (!countryToCreate) return res.status(400)
        .json({ message: 'Nenhum dado recebido.' });
      
      this.name = countryToCreate.name;
      if (!this.name || this.name.length === 0) return res.status(400)
        .json({ message: 'Favor informar o nome da país (campo "name")' });
      
      this.phoneCode = countryToCreate.phoneCode;
      if (!this.phoneCode || this.phoneCode.length === 0) return res.status(400)
        .json({ message: 'Favor informar o código de área telefônico do país (campo "phoneCode")' });

      this.continent = countryToCreate.continent;
      if (!this.continent || this.continent.length === 0) return res.status(400)
        .json({ message: 'Favor informar o continente de localização do país (campo "continent")' })

      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public validateUpdateCountry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const countryToUpdate = req.body;
      const { name, phoneCode, continent } = countryToUpdate;
      
      if (!countryToUpdate || !name && !phoneCode && !continent) return res.status(400)
      .json({ message: 'Sem dado para atualizar' });
      
      const { id } = req.params;
      if (!id || !Number(id)) return res.status(400)
      .json({ message: 'Por favor, nos passe um identificador(id) numérico para atualizar.' });
      
      const foundCountry = await CountriesService.getCountryById(Number(id));
      if (!foundCountry) return res.status(400)  
      .json({
        message:
        `Identificador informado (id: ${id}) não encontrado.` +
        ' Favor informar id válido',
      });  
      
      const countryExists = await CountriesService.countryExists(name);
      if (countryExists) return res.status(400)  
        .json({ message: `Já existe país com o nome ${name}` });
  
      next();
      } catch (error) {
        console.log(error);
        next(error);
      }
    };
    
  public validateDeleteCountry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!id || !Number(id)) return res.status(400)
        .json({ message: 'Por favor, nos passe um identificador(id) numérico para excluir.' });

      const foundCountry = await CountriesService.getCountryById(Number(id));
      if (!foundCountry) return res.status(400)  
      .json({
        message:
        `Identificador informado (id: ${id}) não encontrado.` +
        ' Favor informar id válido',
      });  

      next();
    } catch (error) {
      console.log(error);
      next(error);      
    }
  };
}

export default new CountriesMiddleware;
