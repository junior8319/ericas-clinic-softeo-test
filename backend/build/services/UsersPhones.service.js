"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const UserPhone_model_1 = __importDefault(require("../database/models/UserPhone.model"));
class UsersPhones {
    constructor() {
        this.getUsersPhones = () => __awaiter(this, void 0, void 0, function* () {
            const usersPhonesList = yield UserPhone_model_1.default.findAll({
            // include: [
            // { model: User, through: { attributes: [] } },
            // { model: Telephone, as: 'telephones', through: { attributes: [] } },
            // ],
            });
            if (!usersPhonesList)
                return null;
            return usersPhonesList;
        });
        this.createUserPhone = (userPhone) => __awaiter(this, void 0, void 0, function* () {
            if (!userPhone || !userPhone.type || !userPhone.userId || !userPhone.phoneId)
                return null;
            const userPhoneExists = yield UsersPhones.userPhoneExists(userPhone);
            if (userPhoneExists)
                return null;
            const newUserPhone = UserPhone_model_1.default.create(Object.assign({}, userPhone));
            return newUserPhone;
        });
        UsersPhones.model = new UserPhone_model_1.default();
    }
}
_a = UsersPhones;
UsersPhones.userPhoneExists = (receivedUserPhone) => __awaiter(void 0, void 0, void 0, function* () {
    const userPhone = yield UserPhone_model_1.default.findOne({
        where: {
            type: receivedUserPhone.type,
            userId: receivedUserPhone.userId,
            phoneId: receivedUserPhone.phoneId,
        },
    });
    const exists = !!userPhone;
    return exists;
});
exports.default = UsersPhones;
