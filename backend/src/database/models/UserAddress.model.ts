import { DataTypes, Model } from 'sequelize';
import db from '.';
import PublicPlace from './PublicPlace.model';
import User from './User.model';

class UserAddress extends Model {
  public userId!: number;

  public publicPlaceId!: number;

  public addressNumber!: number;

  public addressComplement!: string;

  public type!: string;

  public addressCompInfo!: string;
}

UserAddress.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    publicPlaceId:{
      type: DataTypes.INTEGER,
      references: {
        model: 'publicPlaces',
        key: 'id',
      },
    },
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

User.belongsToMany(
  PublicPlace,
  {
    foreignKey: 'userId',
    otherKey: 'publicPlaceId',
    through: UserAddress,
    as: 'addresses'
  }
);
PublicPlace.belongsToMany(
  User,
  {
    foreignKey: 'publicPlaceId',
    otherKey: 'userId',
    through: UserAddress,
    as: 'residents'
  }
);

export default UserAddress;
