import UserPhone from '../database/models/UserPhone.model';
import IUserPhone from '../interfaces/userPhone.interface';

class UsersPhones {
  static model: IUserPhone;

  public type!: string;

  public userId!: number;

  public phoneId!: number;

  constructor() {
    UsersPhones.model = new UserPhone();
  }

  public getUsersPhones = async (): Promise<IUserPhone[] | null> => {
    const usersPhonesList = await UserPhone.findAll({
      // include: [
        // { model: User, through: { attributes: [] } },
        // { model: Telephone, as: 'telephones', through: { attributes: [] } },
      // ],
    });
    if (!usersPhonesList) return null;

    return usersPhonesList;
  };

  static userPhoneExists = async (receivedUserPhone: IUserPhone): Promise<boolean> => {
    const userPhone = await UserPhone.findOne({
      where: {
        type: receivedUserPhone.type,
        userId: receivedUserPhone.userId,
        phoneId: receivedUserPhone.phoneId,
      },
    });

    const exists = !!userPhone;

    return exists;
  };

  public createUserPhone = async (userPhone: IUserPhone): Promise<IUserPhone | null> => {
    if (
      !userPhone || !userPhone.type || !userPhone.userId || !userPhone.phoneId
    ) return null;

    const userPhoneExists = await UsersPhones.userPhoneExists(userPhone);
    if (userPhoneExists) return null;

    const newUserPhone = UserPhone.create({ ...userPhone });
    return newUserPhone;    
  };

  public updateUserPhone = async (userPhone: IUserPhone, dataToUpdate: IUserPhone): Promise<IUserPhone | null> => {
    if (
      !userPhone ||
      !userPhone.phoneId ||
      !userPhone.type ||
      !userPhone.userId ||
      !dataToUpdate ||
      !dataToUpdate.phoneId ||
      !dataToUpdate.userId ||
      !dataToUpdate.type
    ) return null;

    this.phoneId = Number(dataToUpdate.phoneId);
    this.type = dataToUpdate.type;
    this.userId = dataToUpdate.userId;

    const userPhoneToUpdate = await UserPhone.findOne({
      where: {
        phoneId: userPhone.phoneId,
        userId: userPhone.userId,
        type: userPhone.type,
      },
    });
    if (!userPhoneToUpdate) return null;

    await userPhoneToUpdate.update({
      phoneId: dataToUpdate.phoneId,
      userId: dataToUpdate.userId,
      type: dataToUpdate.type,
    });

    return userPhoneToUpdate;
  };

  public deleteUserPhone = async (userPhone: IUserPhone): Promise<IUserPhone | null> => {
    if (
      !userPhone ||
      !userPhone.phoneId ||
      !userPhone.userId ||
      !userPhone.type
    ) return null;

    this.userId = userPhone.userId;
    this.phoneId = userPhone.phoneId;
    this.type = userPhone.type;

    const userPhoneToDelete = await UserPhone.findOne({
      where: {
        userId: this.userId,
        phoneId: this.phoneId,
        type: this.type,
      },
    });
    if (!userPhoneToDelete) return null;

    await userPhoneToDelete.destroy();

    return userPhoneToDelete;
  };
}

export default UsersPhones;
