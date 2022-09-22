import { DataTypes, Model } from 'sequelize';
import db from '.';
import City from './City.model';

class Telephone extends Model {
  public id!: number;

  public prefix!: number;

  public number!: number;

  public cityId!: number;
}

Telephone.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    prefix: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    timestamps: false,
    modelName: 'telephone',
    tableName: 'telephones',
  },
);

Telephone.belongsTo(City, { foreignKey: 'cityId', as: 'city' });

export default Telephone;
