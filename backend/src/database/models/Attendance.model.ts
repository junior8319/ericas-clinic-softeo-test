import { DataTypes, Model } from 'sequelize';
import db from '.';

class Attendance extends Model {
  public id!: number;

  public customerUserId!: number;

  public professionalUserId!: number;

  public date!: Date;

  public appointmentHour!: Date;

  public totalPrice!: number;

  public installmentsQuantity!: number;
}

Attendance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    customerUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    professionalUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    appointmentHour: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    installmentsQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    underscored: true,
    timestamps: false,
    modelName: 'attendance',
    tableName: 'attendances',
  }
);

export default Attendance;
