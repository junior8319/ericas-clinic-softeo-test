import express, { NextFunction, Request, Response } from 'express';
import RolesService from '../services/Roles.service';

class RolesMiddleware {
  public app: express.Application;
  public service: RolesService;


  public name!: string;

  public type!: string;

  constructor() {
    this.app = express();
    this.service = new RolesService();
  }

  public validateCreateRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleToCreate = req.body;
      const { name } = roleToCreate;
      const roleExists = await RolesService.roleExists(name);
      if (roleExists) return res.status(400)
        .json({ message: `Já existe função com o nome ${name}` });

      if (!roleToCreate) return res.status(400)
        .json({ message: 'Nenhum dado recebido.' });
      
      this.name = roleToCreate.name;
      if (!this.name || this.name.length === 0) return res.status(400)
        .json({ message: 'Favor informar o nome da função (campo "name")' });
      
      this.type = roleToCreate.type;
      if (!this.type || this.type.length === 0) return res.status(400)
        .json({ message: 'Favor informar o tipo de função (campo "type")' });

      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public validateUpdateRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleToUpdate = req.body;
      const { name, type } = roleToUpdate;
      const roleExists = await RolesService.roleExists(name);

      if (!name) return next();
      if (roleExists) return res.status(400)
        .json({ message: `Já existe função com o nome ${name}` });

      if (!name && !type) return res.status(400).json({ message: 'Sem dado para atualizar' });
        
      next();
      } catch (error) {
        console.log(error);
        next(error);
      }
    };
    
  public validateDeleteRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!id || !Number(id)) return res.status(400)
        .json({ message: 'Por favor, nos passe um identificador(id) numérico para excluir.' });

      next();
    } catch (error) {
      console.log(error);
      next(error);      
    }
  };
}

export default new RolesMiddleware;
