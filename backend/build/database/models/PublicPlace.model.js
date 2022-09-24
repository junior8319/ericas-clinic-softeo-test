"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const Neighborhood_model_1 = __importDefault(require("./Neighborhood.model"));
class PublicPlace extends sequelize_1.Model {
}
PublicPlace.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    neighborhoodId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: _1.default,
    underscored: true,
    timestamps: false,
    modelName: 'publicPlace',
    tableName: 'public_places',
});
PublicPlace.belongsTo(Neighborhood_model_1.default, { foreignKey: 'neighborhoodId', as: 'neighborhood' });
exports.default = PublicPlace;
