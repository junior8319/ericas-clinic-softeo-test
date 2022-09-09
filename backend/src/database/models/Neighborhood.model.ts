import { DataTypes, Model } from 'sequelize';
import db from '.';
import City from './City.model';

class Neighborhood extends Model {
  public id!: number;

  public name!: string;

  public cityId!: number;
}

Neighborhood.init(
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
    cityId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    underscored: true,
    timestamps: false,
    modelName: 'neighborhood',
    tableName: 'neighborhoods',
  }
);

Neighborhood.belongsTo(City, { foreignKey: 'cityId', as: 'city' });

export default Neighborhood;
