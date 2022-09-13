import { DataTypes, Model } from 'sequelize';
import db from '.';
import Attendance from './Attendance.model';

class Installment extends Model {
  public id!: number;

  public attendanceId!: number;

  public date!: Date;

  public price!: number;

  public status!: Boolean;
}

Installment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    attendanceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    underscored: true,
    timestamps: false,
    modelName: 'installment',
    tableName: 'installments',
  }
);

Installment.belongsTo(Attendance, { foreignKey: 'attendanceId', as: 'attendance' });

export default Installment;
