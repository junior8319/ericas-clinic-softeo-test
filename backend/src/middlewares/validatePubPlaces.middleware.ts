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
              ' se localiza o logradouro (rua, av., etc.).' +
              ' Deve ser um dado numérico.'
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

      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public validateUpdatePublicPlace = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pubPlaceToUpdate = req.body;
      const { name, type, neighborhoodId } = pubPlaceToUpdate;

      if (!pubPlaceToUpdate || !name && !neighborhoodId) return res.status(400)
        .json({ message: 'Sem dado para atualizar.' })
      
      const { id } = req.params;
      if (!id || !Number(id)) return res.status(400)
        .json({
          message:
            'Por favor, nos informe um identificador (id) numérico para atualizar.'
        });
      
      this.id = Number(id);
      const foundPublicPlace = await PublicPlacesService.getPubPlaceById(this.id);
      if (!foundPublicPlace) return res.status(400)
        .json({
          message:
            `Identificador (id: ${this.id} não corresponde` +
            ' a registros presentes no banco.' +
            ' Favor informar id válido.',
        });
      
      if (!name || !neighborhoodId) return next();
      const publicPlaceExists = await PublicPlacesService
        .publicPlaceExists(name, neighborhoodId);
      if (publicPlaceExists) return res.status(400)
        .json({
          message: 'Já existe registro com esses dados, verifique por favor.',
        });

      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public validateDeletePublicPlace = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!id || !Number(id)) return res.status(400)
        .json({
          message:
            'Por favor, nos informe um identificador' +
            ' (id) numérico para excluir.',
        });
      
      this.id = Number(id);
      const foundPublicPlace = await PublicPlacesService.getPubPlaceById(Number(id));
      if (!foundPublicPlace) res.status(400)
        .json({
          message:
            `Identificador informado (id: ${this.id} não corresponde` +
            ' a nenhum logradouro cadastrado.' +
            'Favor informar um id existente.' ,
      });

      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default new PublicPlacesMiddleware();
