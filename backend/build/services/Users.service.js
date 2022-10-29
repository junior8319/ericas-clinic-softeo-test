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
const Attendance_model_1 = __importDefault(require("../database/models/Attendance.model"));
const PublicPlace_model_1 = __importDefault(require("../database/models/PublicPlace.model"));
const Role_model_1 = __importDefault(require("../database/models/Role.model"));
const Telephone_model_1 = __importDefault(require("../database/models/Telephone.model"));
const User_model_1 = __importDefault(require("../database/models/User.model"));
class Users {
    constructor() {
        this.getUsers = () => __awaiter(this, void 0, void 0, function* () {
            const usersList = yield User_model_1.default.findAll({
                include: [
                    { model: Role_model_1.default, as: 'role', attributes: { exclude: ['id'] } },
                    { model: Attendance_model_1.default, as: 'appointments', attributes: { exclude: ['id'] } },
                    { model: Attendance_model_1.default, as: 'attendances', attributes: { exclude: ['id'] } },
                    { model: Telephone_model_1.default, as: 'telephones', through: { attributes: ['type'] } },
                    {
                        model: PublicPlace_model_1.default,
                        as: 'addresses',
                        through: {
                            attributes: [
                                'addressNumber',
                                'addressComplement',
                                'type',
                                'addressCompInfo',
                            ]
                        },
                    },
                ],
            });
            if (!usersList)
                return null;
            return usersList;
        });
        this.createUser = (user) => __awaiter(this, void 0, void 0, function* () {
            if (!user)
                return null;
            this.cpf = user.cpf;
            const userExists = yield Users.userExists(this.cpf);
            if (userExists)
                return null;
            const createdUser = User_model_1.default.create(Object.assign({}, user));
            return createdUser;
        });
        this.updateUser = (user) => __awaiter(this, void 0, void 0, function* () {
            if (!user || !user.id)
                return null;
            this.id = user.id;
            const userToUpdate = yield User_model_1.default.findByPk(this.id);
            if (!userToUpdate)
                return null;
            if (user.name) {
                yield userToUpdate.update({ name: user.name });
            }
            if (user.birthDate) {
                yield userToUpdate.update({ birthDate: user.birthDate });
            }
            if (user.cpf) {
                yield userToUpdate.update({ cpf: user.cpf });
            }
            if (user.rg) {
                yield userToUpdate.update({ rg: user.rg });
            }
            if (user.roleId) {
                yield userToUpdate.update({ roleId: user.roleId });
            }
            yield userToUpdate.update({ updatedAt: Date.now() });
            return userToUpdate;
        });
        this.deleteUser = (receivedId) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedId)
                return null;
            this.id = Number(receivedId);
            const userToDelete = yield User_model_1.default.findByPk(this.id);
            if (!userToDelete)
                return null;
            yield userToDelete.destroy();
            return userToDelete;
        });
        Users.model = new User_model_1.default();
    }
}
_a = Users;
Users.userExists = (receivedCpf) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_model_1.default.findOne({
        where: { cpf: receivedCpf },
    });
    const exists = !!user;
    return exists;
});
Users.getUserById = (receivedId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_model_1.default.findByPk(receivedId);
    if (!user)
        return null;
    return user;
});
exports.default = Users;
