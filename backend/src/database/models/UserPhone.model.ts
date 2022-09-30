import { DataTypes, Model } from 'sequelize';
import db from '.';
import Telephone from './Telephone.model';
import User from './User.model';

class UserPhone extends Model {
  public type!: string;

  public userId!: number;

  public phoneId!: number;
}

UserPhone.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },

    phoneId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'telephones',
        key: 'id',
      },
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
    modelName: 'userPhone',
    tableName: 'users_phones',
  }
);

User.belongsToMany(Telephone, { foreignKey: 'userId', otherKey: 'phoneId', through: UserPhone, as: 'telephones' });
Telephone.belongsToMany(User, { foreignKey: 'phoneId', otherKey: 'userId', through: UserPhone, as: 'users' });

export default UserPhone;
