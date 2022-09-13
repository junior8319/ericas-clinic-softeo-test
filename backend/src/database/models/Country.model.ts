import { DataTypes, Model } from 'sequelize';
import db from '.';

class Country extends Model {
  public id!: number;

  public name!: string;

  public phoneCode!: number;

  public continent!: string;
}

Country.init(
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

   continent: {
    type: DataTypes.STRING,
    allowNull: false,
   },
  },
  {
    underscored: true,
    sequelize: db,
    timestamps: false,
    modelName: 'country',
    tableName: 'countries',
  }
);

export default Country;
