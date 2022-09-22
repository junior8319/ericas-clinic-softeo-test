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
const Role_model_1 = __importDefault(require("../database/models/Role.model"));
class Roles {
    constructor() {
        this.getRoles = () => __awaiter(this, void 0, void 0, function* () {
            const roles = yield Role_model_1.default.findAll({ raw: true });
            if (!roles)
                return null;
            return roles;
        });
        this.createRole = (role) => __awaiter(this, void 0, void 0, function* () {
            if (!role)
                return null;
            this.name = role.name;
            const roleExists = yield Roles.roleExists(this.name);
            if (roleExists)
                return null;
            const createdRole = yield Role_model_1.default.create(Object.assign({}, role));
            return createdRole;
        });
        this.updateRole = (role) => __awaiter(this, void 0, void 0, function* () {
            if (!role)
                return null;
            if (role.id)
                this.id = role.id;
            const roleToUpdate = yield Role_model_1.default.findOne({ where: { id: this.id } });
            if (!roleToUpdate)
                return null;
            if (role.name) {
                yield roleToUpdate.update({
                    name: role.name,
                });
            }
            if (role.type) {
                yield roleToUpdate.update({
                    type: role.type,
                });
            }
            return roleToUpdate;
        });
        this.deleteRole = (receivedId) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedId)
                return null;
            this.id = Number(receivedId);
            const roleToDelete = yield Role_model_1.default.findOne({ where: { id: this.id } });
            if (roleToDelete)
                yield roleToDelete.destroy();
            return roleToDelete;
        });
        Roles.model = new Role_model_1.default();
    }
}
_a = Roles;
Roles.roleExists = (receivedName) => __awaiter(void 0, void 0, void 0, function* () {
    const role = yield Role_model_1.default.findOne({
        where: { name: receivedName },
    });
    const exists = !!role;
    return exists;
});
exports.default = Roles;
