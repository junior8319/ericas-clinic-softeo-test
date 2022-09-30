import { Request, Response, NextFunction } from 'express';
import UsersPhonesService from '../services/UsersPhones.service';
import IUserPhone from '../interfaces/userPhone.interface';

class UsersPhones {
  public service: UsersPhonesService;

  constructor() {
    this.service = new UsersPhonesService();
  }

  public getUsersPhones = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const usersPhonesList: IUserPhone[] | null = await this.service.getUsersPhones();
      if (!usersPhonesList) return res.status(404)
        .json({ message: 'Não encontramos telefones associados a pessoas' });

      return res.status(200).json(usersPhonesList);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public createUserPhone = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUserPhone = req.body;
      
      const createdUserPhone: IUserPhone | null = await this.service
        .createUserPhone(newUserPhone);
      if (!createdUserPhone) return res.status(400).json({
        message: `Não foi possível associar com os dados ${newUserPhone}`
      });

      return res.status(201).json(createdUserPhone);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default new UsersPhones();
