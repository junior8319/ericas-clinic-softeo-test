import express, { NextFunction, Request, Response } from 'express';
import UsersService from '../services/Users.service';

class UsersMiddleware {
  public app: express.Application;

  public service: UsersService;

  public id!: number;

  public name!: string;

  public birthDate!: Date;

  public cpf!: string;

  public rg!: string;

  public roleId!: number;

  constructor() {
    this.app = express();
    this.service = new UsersService();
  }

  public validateCreateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userToCreate = req.body;
      if (!userToCreate || Object.keys(userToCreate).length === 0) {
        return res.status(400).json({ message: 'Nenhum dado recebido.' });
      }

      const { cpf } = userToCreate;
      this.cpf = cpf;
      if (!this.cpf || this.cpf.length === 0 || !this.cpf.length) {
        return res.status(400)
          .json({
            message:
              'Favor informar o número de cpf da pessoa usuária (campo "cpf")',
          });
      }
        
      const userExists = await UsersService.userExists(this.cpf);
      if (userExists) return res.status(400)
        .json({
          message:
          `Já existe pessoa usuária com o cpf número ${this.cpf}`
        });
      
      const { name } = userToCreate;
      this.name = name;
      if (!this.name || !this.name.length || this.name.length === 0) {
        return res.status(400)
          .json({
            message: 'Favor informar o nome da pessoa usuária (campo "name")',
          });
      }

      const { birthDate } = userToCreate;
      this.birthDate = birthDate;
      if (!this.birthDate || !this.birthDate.toLocaleDateString('pt-BR')) {
        return res.status(400)
          .json({
            message:
              'Favor informar uma data de nascimento (campo "birthDate")' +
              ' no formato "dd/mm/aaa"',
          });
      }

      const { rg } = userToCreate;
      this.rg = rg;
      if (!this.rg || !this.rg.length || this.rg.length === 0) {
        return res.status(400)
          .json({
            message:
              'Favor informar uma data de nascimento (campo "rg")',
          });
      }

      const { roleId } = userToCreate;
      this.roleId = Number(roleId);
      if (!this.roleId || !Number(roleId)) {
        return res.status(400)
          .json({
            message:
              'Favor informar a função da pessoa usuária' +
              ' (campo "roleId") numérico.'
          });
      }

      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default new UsersMiddleware();
