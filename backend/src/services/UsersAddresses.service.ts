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

  static userAddressExists = async (receivedUserAddress: IUserAddress): Promise<boolean> => {
    const userAddress = await UserAddress.findOne({
      where: {
        userId: receivedUserAddress.userId,
        publicPlaceId: receivedUserAddress.publicPlaceId,
        addressNumber: receivedUserAddress.addressNumber,
        type: receivedUserAddress.type,
      },
    });

    const exists = !!userAddress;

    return exists;
  };

  public createUserAddress = async (userAddress: IUserAddress): Promise<IUserAddress | null> => {
    if (
      !userAddress ||
      !userAddress.userId ||
      !userAddress.publicPlaceId ||
      !userAddress.addressNumber ||
      !userAddress.type
    ) return null;

    const userAddressExists = await UsersAddresses.userAddressExists(userAddress);
    if (userAddressExists) return null;

    const newUserAddress = UserAddress.create({ ...userAddress });
    return newUserAddress;
  };
}

export default UsersAddresses;
