import Role from "../database/models/Role.model";
import IRole from "../interfaces/role.interface";

class Roles {
  static model: Role;

  public name!: string;

  constructor() {
    Roles.model = new Role();
  }

  public getRoles = async (): Promise<IRole[] | null> => {
    const roles = await Role.findAll({ raw: true });

    if (!roles) return null;

    return roles;
  };

  static roleExists = async (receivedName: string): Promise<boolean> => {
    const role = await Role.findOne({
      where: { name: receivedName },
    });

    const exists = !!role;

    return exists;
  };

  public createRole = async (role: IRole): Promise<IRole | null> => {
    if (!role) return null;

    this.name = role.name;

    const createdRole = await Role.create({ ...role });

    return createdRole;
  };
}

export default Roles;
