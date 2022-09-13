"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const Telephone_model_1 = __importDefault(require("./Telephone.model"));
const User_model_1 = __importDefault(require("./User.model"));
class UserPhone extends sequelize_1.Model {
}
UserPhone.init({
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: _1.default,
    underscored: true,
    timestamps: false,
    modelName: 'userPhone',
    tableName: 'users_phones',
});
User_model_1.default.belongsToMany(Telephone_model_1.default, { through: UserPhone });
Telephone_model_1.default.belongsToMany(User_model_1.default, { through: UserPhone });
exports.default = UserPhone;
