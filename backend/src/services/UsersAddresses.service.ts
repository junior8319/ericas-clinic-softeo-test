import UserAddress from "../database/models/UserAddress.model";
import IUserAddress from "../interfaces/userAddress.interface";

class UsersAddresses {
  static model: IUserAddress;

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

  public updateUserAddress = async (newData: IUserAddress, prevData: IUserAddress): Promise<IUserAddress | null> => {
    if (!newData ||
      !prevData ||
      !prevData.userId ||
      !prevData.publicPlaceId ||
      !prevData.addressNumber
    ) return null;

    const userAddressToUpdate = await UserAddress.findOne({
      where: {
        userId: prevData.userId,
        publicPlaceId: prevData.publicPlaceId,
        addressNumber: prevData.addressNumber,
      },
    });
    if (!userAddressToUpdate) return null;

    if (newData.userId) {
      await userAddressToUpdate.update({ userId: newData.userId });
    }

    if (newData.publicPlaceId) {
      await userAddressToUpdate.update({
        publicPlaceId: newData.publicPlaceId
      });
    }

    if (newData.addressNumber) {
      await userAddressToUpdate.update({ addressNumber: newData.addressNumber });
    }

    if (newData.type) {
      await userAddressToUpdate.update({ type: newData.type });
    }

    if (newData.addressComplement) {
      await userAddressToUpdate.update({ addressComplement: newData.addressComplement });
    }

    if (newData.addressCompInfo) {
      await userAddressToUpdate.update({ addressCompInfo: newData.addressCompInfo });
    }

    return userAddressToUpdate;
  };
}

export default UsersAddresses;
