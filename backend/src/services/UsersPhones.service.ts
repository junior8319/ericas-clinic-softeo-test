import Telephone from '../database/models/Telephone.model';
import User from '../database/models/User.model';
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

  public updateUserPhone = async (userPhone: IUserPhone): Promise<IUserPhone | null> => {
    if (
      !userPhone ||
      !userPhone.phoneId ||
      !userPhone.type ||
      !userPhone.userId
    ) return null;

    this.phoneId = userPhone.phoneId;
    this.type = userPhone.type;
    this.userId = userPhone.userId;

    const userPhoneToUpdate = await UserPhone.findOne({
      where: {
        phoneId: this.phoneId,
        userId: this.userId,
        type: this.type,
      },
    });
    if (!userPhoneToUpdate) return null;

    await userPhoneToUpdate.update({
      phoneId: userPhone.phoneId,
      userId: userPhone.userId,
      type: userPhone.type,
    });

    return userPhoneToUpdate;
  };
}

export default UsersPhones;
