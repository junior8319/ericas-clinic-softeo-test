import { DataTypes, Model } from 'sequelize';
import db from '.';
import Country from './Country.model';

class City extends Model {
  public id!: number;

  public name!: string;

  public phoneCode!: number;

  public state!: string;

  public countryId!: number;
}

City.init(
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

    phoneCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    timestamps: false,
    modelName: 'city',
    tableName: 'cities',
  }
);

City.belongsTo(Country, { foreignKey: 'countryId', as: 'country' });

export default City;
