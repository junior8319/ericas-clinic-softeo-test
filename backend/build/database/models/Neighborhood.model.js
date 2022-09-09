"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const City_model_1 = __importDefault(require("./City.model"));
class Neighborhood extends sequelize_1.Model {
}
Neighborhood.init({
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
    cityId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: _1.default,
    underscored: true,
    timestamps: false,
    modelName: 'neighborhood',
    tableName: 'neighborhoods',
});
Neighborhood.belongsTo(City_model_1.default, { foreignKey: 'cityId', as: 'city' });
exports.default = Neighborhood;
