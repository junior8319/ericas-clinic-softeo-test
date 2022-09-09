import { DataTypes, Model } from 'sequelize';
import db from '.';
import Telephone from './Telephone.model';
import User from './User.model';

class UserPhone extends Model {
  public type!: string;
}

UserPhone.init(
  {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    underscored: true,
    timestamps: false,
    modelName: 'userPhone',
    tableName: 'users_phones',
  }
);

User.belongsToMany(Telephone, { through: UserPhone });
Telephone.belongsToMany(User, { through: UserPhone });

export default UserPhone;
