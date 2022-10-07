import { NextFunction, Request, Response } from 'express';
import IRole from '../interfaces/role.interface';
import errorMiddleware from '../middlewares/error.middleware';
import RolesService from '../services/Roles.service';

class Roles {
  public service: RolesService;

  constructor() {
    this.service = new RolesService();
  }

  public getRoles = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const rolesList: IRole[] | null = await this.service.getRoles();
      
      if (!rolesList) return res.status(404).json({ message: 'Não encontramos atribuições de pessoas usuárias.' });

      return res.status(200).json(rolesList);
    } catch (error) {
      errorMiddleware.handleErrors();
    }
  };

  public createRole = async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const role = req.body;

      const createdRole: IRole | null = await this.service.createRole(role);
      if (!createdRole) {
        return res.status(400).json({
          message: `Não foi possível criar a função com os dados:`,
          name: role.name,
          type: role.type,
        });
      }

      return res.status(201).json(createdRole);
    } catch (error) {
      console.log(error);
      return errorMiddleware.handleErrors();
    }
  };

  public updateRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const role = { ...req.body, id };

      await this.service.updateRole(role);

      return res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  };

  public deleteRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      
      await this.service.deleteRole(id);

      return res.status(202).json({ message: 'Registro excluído com sucesso.' });
    } catch (error) {
      next(error);
    }
  };
}

export default new Roles();
