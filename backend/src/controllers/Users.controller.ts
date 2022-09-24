import { NextFunction, Request, Response } from 'express';
import UsersService from '../services/Users.service';
import IUser from '../interfaces/user.interface';

class Users {
  public service: UsersService;

  constructor() {
    this.service = new UsersService();
  }

  public getUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const usersList: IUser[] | null = await this.service.getUsers();
      if (!usersList) return res.status(404)
        .json({ message: 'Não encontramos pessoas usuárias.' });

      return res.status(200).json(usersList);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = req.body;

      const createdUser: IUser | null = await this.service.createUser(newUser);
      if (!createdUser) {
        return res.status(400)
        .json({
          message: `Não foi possível criar usuário com os dados ${newUser}`,
        });
      }

      return res.status(201).json(createdUser);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id || !req.body) return res.status(400)
        .json({ message: 'Sem dado para atualizar' });
      
      const user = { ...req.body, id };
      
      await this.service.updateUser(user);

      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400)
        .json({
          message: 'Por favor, nos passe um identificador(id) para excluir.',
        });
      
      const userDeleted = await this.service.deleteUser(id);
      if(!userDeleted) return res.status(404)
        .json({ message: `Não encontramos usuário com o id ${id}` });

      return res.status(202).json({ message: 'Registro excluído com sucesso' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default new Users();
