import { NextFunction, Request, Response } from 'express';
import UsersAddressesService from '../services/UsersAddresses.service';

class UsersAddresses {
  public service: UsersAddressesService;

  public addressNumber!: number;

  public addressComplement!: string;

  public type!: string;

  public addressCompInfo!: string;

  constructor() {
    this.service = new UsersAddressesService();
  }

  public getUsersAddresses = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const usersAddressesList = await this.service.getUsersAddresses();
      if (!usersAddressesList) return res.status(404)
        .json({ message: 'Não encontramos endereços associados a pessoas' });

      return res.status(200).json(usersAddressesList);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default new UsersAddresses();
