import { DataTypes, Model } from 'sequelize';
import db from '.';
import Neighborhood from './Neighborhood.model';

class PublicPlace extends Model {
  public id!: number;

  public type!: string;

  public name!: string;

  public neighborhoodId!: number;
}

PublicPlace.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    neighborhoodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    underscored: true,
    timestamps: false,
    modelName: 'publicPlace',
    tableName: 'public_places',
  }
);

PublicPlace.belongsTo(Neighborhood, { foreignKey: 'neighborhoodId', as: 'neighborhood' });

export default PublicPlace;
