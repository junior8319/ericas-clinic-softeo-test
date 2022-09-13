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
User_model_1.default.belongsToMany(PublicPlace_model_1.default, { through: UserAddress });
PublicPlace_model_1.default.belongsToMany(User_model_1.default, { through: UserAddress });
exports.default = UserAddress;
