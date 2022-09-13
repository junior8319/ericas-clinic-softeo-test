import { DataTypes, Model } from 'sequelize';
import db from '.';
import Attendance from './Attendance.model';
import Role from './Role.model';

class User extends Model {
  public id!: number;

  public name!: string;

  public birthDate!: Date;

  public cpf!: number;

  public rg!: number;

  public roleId!: number;
}

User.init(
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
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },
    rg: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    underscored: true,
    timestamps: true,
    modelName: 'user',
    tableName: 'users',
  }
);

User.hasOne(Role, { foreignKey: 'roleId', as: 'role' });
User.hasMany(Attendance, { foreignKey: 'customerUserId', as: 'appointments'  });
User.hasMany(Attendance, { foreignKey: 'professionalUserId', as: 'attendances' });

export default User;
