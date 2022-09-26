import Attendance from "../database/models/Attendance.model";
import Role from "../database/models/Role.model";
import User from "../database/models/User.model";
import IUser from "../interfaces/user.interface";

class Users {
  static model: IUser;

  public id!: number;

  public name!: string;

  constructor() {
    Users.model = new User();
  }

  public getUsers = async (): Promise<IUser[] | null> => {
    const usersList = await User.findAll({
      include: [
        { model: Role, as: 'role', attributes: { exclude: ['id'] } },
        { model: Attendance, as: 'appointments', attributes: { exclude: ['id'] } },
        { model: Attendance, as: 'attendances', attributes: { exclude: ['id'] } },
      ],
    });
    if (!usersList) return null;

    return usersList;
  };

  static userExists = async (receivedName: string): Promise<boolean> => {
    const user = await User.findOne({
      where: { name: receivedName },
    });

    const exists = !!user;

    return exists;
  };

  public createUser = async (user: IUser): Promise<IUser | null> => {
    if (!user) return null;

    this.name = user.name;

    const userExists = await Users.userExists(this.name);
    if (userExists) return null;

    const createdUser = User.create({ ...user });
    return createdUser;
  };

  public updateUser = async (user: IUser): Promise<IUser | null> => {
    if (!user || !user.id) return null;

    this.id = user.id;

    const userToUpdate = await User.findByPk(this.id);
    if (!userToUpdate) return null;

    if (user.name) {
      await userToUpdate.update({ name: user.name });
    }

    if (user.birthDate) {
      await userToUpdate.update({ birthDate: user.birthDate });
    }

    if (user.cpf) {
      await userToUpdate.update({ cpf: user.cpf });
    }

    if (user.rg) {
      await userToUpdate.update({ rg: user.rg });
    }

    if (user.roleId) {
      await userToUpdate.update({ roleId: user.roleId });
    }

    await userToUpdate.update({ updatedAt: Date.now() });

    return userToUpdate;
  };

  public deleteUser = async (receivedId: string): Promise<IUser | null> => {
    if (!receivedId) return null;

    this.id = Number(receivedId);

    const userToDelete = await User.findByPk(this.id);
    if (!userToDelete) return null;

    await userToDelete.destroy();

    return userToDelete;
  };
}

export default Users;
