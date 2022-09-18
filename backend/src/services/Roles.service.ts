import Role from "../database/models/Role.model";
import IRole from "../interfaces/role.interface";

class Roles {
  static model: Role;

  constructor() {
    Roles.model = new Role();
  }

  public getRoles = async (): Promise<IRole[] | null> => {
    const roles = await Role.findAll({ raw: true });

    if (!roles) return null;

    return roles;
  };
}

export default Roles;
