import express, { NextFunction, Request, Response } from 'express';
import CitiesService from '../services/Cities.service';

class CitiesMiddleware {
  public app: express.Application;
  public service: CitiesService;


  public name!: string;

  public phoneCode!: string;

  public state!: string;

  public countryId!: number;

  constructor() {
    this.app = express();
    this.service = new CitiesService();
  }

  public validateCreateCity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cityToCreate = req.body;      
      if (!cityToCreate || Object.keys(cityToCreate).length === 0) return res
      .status(400).json({ message: 'Nenhum dado recebido.' });
      
      const { name } = cityToCreate;
      this.name = cityToCreate.name;
      if (!this.name || this.name.length === 0) return res.status(400)
      .json({ message: 'Favor informar o nome da cidade (campo "name")' });
      
      const cityExists = await CitiesService.cityExists(name);
      if (cityExists) return res.status(400)
        .json({ message: `Já existe cidade com o nome ${name}` });
      
      this.phoneCode = cityToCreate.phoneCode;
      if (!this.phoneCode || this.phoneCode.length === 0) return res.status(400)
        .json({ message: 'Favor informar o código de área telefônico da cidade (campo "phoneCode")' });

      this.state = cityToCreate.state;
      if (!this.state || this.state.length === 0) return res.status(400)
        .json({ message: 'Favor informar o estado onde se localiza a cidade (campo "state")' });

      this.countryId = cityToCreate.countryId;
      if (!this.countryId || this.countryId === 0) return res.status(400).json({
        message:
          'Favor informar o identificador (id) válido de um país.'
        });

      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public validateUpdateCity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cityToUpdate = req.body;
      const { name, phoneCode, state, countryId } = cityToUpdate;
      
      if (
        !cityToUpdate ||
        !name &&
        !phoneCode &&
        !state &&
        !countryId
      ) return res.status(400)
      .json({ message: 'Sem dado para atualizar' });
      
      const { id } = req.params;
      if (!id || !Number(id)) return res.status(400)
      .json({ message: 'Por favor, nos passe um identificador(id) numérico para atualizar.' });
      
      const foundCity = await CitiesService.getCityById(Number(id));
      if (!foundCity) return res.status(400)  
        .json({
          message:
          `Identificador informado (id: ${id}) não encontrado.` +
          ' Favor informar id válido',
        });  
      
      if (!name) return next();
      const cityExists = await CitiesService.cityExists(name);
      if (cityExists) return res.status(400)  
        .json({ message: `Já existe cidade com o nome ${name}` });
  
      next();
      } catch (error) {
        console.log(error);
        next(error);
      }
    };
    
  public validateDeleteCity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!id || !Number(id)) return res.status(400)
        .json({ message: 'Por favor, nos passe um identificador(id) numérico para excluir.' });

      const foundCity = await CitiesService.getCityById(Number(id));
      if (!foundCity) return res.status(400)  
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

export default new CitiesMiddleware;
