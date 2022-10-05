import { DataTypes, Model } from 'sequelize';
import db from '.';
import PublicPlace from './PublicPlace.model';
import User from './User.model';

class UserAddress extends Model {
  public addressNumber!: number;

  public addressComplement!: string;

  public type!: string;

  public addressCompInfo!: string;
}

UserAddress.init(
  {
    addressNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    addressComplement: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressCompInfo: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    underscored: true,
    timestamps: false,
    modelName: 'userAddress',
    tableName: 'users_addresses',
  }
);

User.belongsToMany(PublicPlace, { through: UserAddress, as: 'addresses' });
PublicPlace.belongsToMany(User, { through: UserAddress, as: 'residents' });

export default UserAddress;
