import UserAddress from "../database/models/UserAddress.model";
import IUserAddress from "../interfaces/userAddress.interface";

class UsersAddresses {
  static model: IUserAddress;

  public addressNumber!: number;

  public addressComplement!: string;

  public type!: string;

  public addressCompInfo!: string;

  constructor() {
    UsersAddresses.model = new UserAddress();
  }

  public getUsersAddresses = async (): Promise<IUserAddress[] | null> => {
    const usersAddressesList = await UserAddress.findAll();
    if (!usersAddressesList) return null;

    return usersAddressesList;
  };
}

export default UsersAddresses;
