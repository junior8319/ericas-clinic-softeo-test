"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const User_model_1 = __importDefault(require("./User.model"));
class Attendance extends sequelize_1.Model {
}
Attendance.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    customerUserId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    professionalUserId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    appointmentHour: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false,
    },
    totalPrice: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
    },
    installmentsQuantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: _1.default,
    underscored: true,
    timestamps: false,
    modelName: 'attendance',
    tableName: 'attendances',
});
Attendance.belongsTo(User_model_1.default, { foreignKey: 'professionalUserId', as: 'attendant' });
Attendance.belongsTo(User_model_1.default, { foreignKey: 'customerUserId', as: 'patient' });
User_model_1.default.hasMany(Attendance, { foreignKey: 'professionalUserId', as: 'attendances' });
User_model_1.default.hasMany(Attendance, { foreignKey: 'customerUserId', as: 'appointments' });
exports.default = Attendance;
