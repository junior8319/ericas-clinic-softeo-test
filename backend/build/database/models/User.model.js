"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const Role_model_1 = __importDefault(require("./Role.model"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    birthDate: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    cpf: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    rg: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    roleId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    sequelize: _1.default,
    underscored: true,
    timestamps: true,
    modelName: 'user',
    tableName: 'users',
});
User.belongsTo(Role_model_1.default, { foreignKey: 'roleId', as: 'role' });
exports.default = User;
