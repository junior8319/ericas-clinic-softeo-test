import Role from "../database/models/Role.model";
import IRole from "../interfaces/role.interface";

class Roles {
  static model: Role;

  public name!: string;

  public id!: number;

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

    const roleExists = await Roles.roleExists(this.name);
    if (roleExists) return null;

    const createdRole = await Role.create({ ...role });

    return createdRole;
  };

  public updateRole = async (role: IRole): Promise<IRole | null> => {
    if (!role) return null;

    if (role.id) this.id = role.id;

    const roleToUpdate = await Role.findOne({ where: { id: this.id } });
    if (!roleToUpdate) return null;

    if (role.name) {
      await roleToUpdate.update({
        name: role.name,
      });
    }

    if (role.type) {
      await roleToUpdate.update({
        type: role.type,
      });
    }

    return roleToUpdate;
  };

  public deleteRole = async (receivedId: string): Promise<IRole | null> => {
    if (!receivedId) return null;

    this.id = Number(receivedId);

    const roleToDelete = await Role.findOne({ where: { id: this.id }  });

    if (roleToDelete) await roleToDelete.destroy();

    return roleToDelete;
  };
}

export default Roles;
