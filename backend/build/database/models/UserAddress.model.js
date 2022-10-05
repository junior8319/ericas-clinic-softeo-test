"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const PublicPlace_model_1 = __importDefault(require("./PublicPlace.model"));
const User_model_1 = __importDefault(require("./User.model"));
class UserAddress extends sequelize_1.Model {
}
UserAddress.init({
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    publicPlaceId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'publicPlaces',
            key: 'id',
        },
    },
    addressNumber: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    addressComplement: {
        type: sequelize_1.DataTypes.STRING,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    addressCompInfo: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: _1.default,
    underscored: true,
    timestamps: false,
    modelName: 'userAddress',
    tableName: 'users_addresses',
});
User_model_1.default.belongsToMany(PublicPlace_model_1.default, {
    foreignKey: 'userId',
    otherKey: 'publicPlaceId',
    through: UserAddress,
    as: 'addresses'
});
PublicPlace_model_1.default.belongsToMany(User_model_1.default, {
    foreignKey: 'publicPlaceId',
    otherKey: 'userId',
    through: UserAddress,
    as: 'residents'
});
exports.default = UserAddress;
