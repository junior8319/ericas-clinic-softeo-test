import { NextFunction, Request, Response } from 'express';
import IUserAddress from '../interfaces/userAddress.interface';
import UsersAddressesService from '../services/UsersAddresses.service';

class UsersAddresses {
  public service: UsersAddressesService;

  public userId!: number;

  public publicPlaceId!: number;

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

  public createUserAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUserAddress = req.body;

      const createdUserAddress: IUserAddress | null = await this.service.createUserAddress(newUserAddress);
      if (!createdUserAddress) return res.status(400).json({
        message: `Não foi possível associar com os dados ${newUserAddress}`
      });

      return res.status(201).json(createdUserAddress);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public updateUserAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, publicPlaceId, addressNumber } = req.params;
      this.userId = Number(userId);
      this.publicPlaceId = Number(publicPlaceId);
      this.addressNumber = Number(addressNumber);
      const newData = req.body;
      if (!userId || !publicPlaceId || !addressNumber) {
        return res.status(400)
          .json({
            message:
              'Favor informar dados para buscar (userId, publicPlaceId, addressNumber',
        });
      }
      if (!newData) {
        return res.status(400)
          .json({
            message: 'Favor informar dados para atualizar',
        });
      }

      const updatedUserAddress = await this.service.updateUserAddress(
        newData,
        { 
          userId: this.userId,
          publicPlaceId: this.publicPlaceId,
          addressNumber: this.addressNumber,
        },
      );

      return res.status(200).json(updatedUserAddress);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default new UsersAddresses();
