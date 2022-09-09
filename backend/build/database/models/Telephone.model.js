"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const City_model_1 = __importDefault(require("./City.model"));
class Telephone extends sequelize_1.Model {
}
Telephone.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    prefix: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    number: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    cityId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    underscored: true,
    sequelize: _1.default,
    timestamps: false,
    modelName: 'telephne',
    tableName: 'telephones',
});
Telephone.belongsTo(City_model_1.default, { foreignKey: 'cityId', as: 'city' });
exports.default = Telephone;
