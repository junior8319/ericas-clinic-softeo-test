import { DataTypes, Model } from 'sequelize';
import db from '.';

class Role extends Model {
  public id!: number;

  public name!: string;

  public type!: string;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    underscored: true,
    timestamps: false,
    modelName: 'role',
    tableName: 'roles',
  }
);

export default Role;
