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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Roles_service_1 = __importDefault(require("../services/Roles.service"));
class RolesMiddleware {
    constructor() {
        this.validateCreateRoles = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const roleToCreate = req.body;
                const { name } = roleToCreate;
                const roleExists = yield Roles_service_1.default.roleExists(name);
                if (roleExists)
                    return res.status(400)
                        .json({ message: `Já existe função com o nome ${name}` });
                if (!roleToCreate)
                    return res.status(400)
                        .json({ message: 'Nenhum dado recebido.' });
                this.name = roleToCreate.name;
                if (!this.name || this.name.length === 0)
                    return res.status(400)
                        .json({ message: 'Favor informar o nome da função (campo "name")' });
                this.type = roleToCreate.type;
                if (!this.type || this.type.length === 0)
                    return res.status(400)
                        .json({ message: 'Favor informar o tipo de função (campo "type")' });
                next();
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.validateUpdateRole = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const roleToUpdate = req.body;
                const { name, type } = roleToUpdate;
                const roleExists = yield Roles_service_1.default.roleExists(name);
                if (!name)
                    return next();
                if (roleExists)
                    return res.status(400)
                        .json({ message: `Já existe função com o nome ${name}` });
                if (!name && !type)
                    return res.status(400).json({ message: 'Sem dado para atualizar' });
                next();
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.validateDeleteRole = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id || !Number(id))
                    return res.status(400)
                        .json({ message: 'Por favor, nos passe um identificador(id) numérico para excluir.' });
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.app = (0, express_1.default)();
        this.service = new Roles_service_1.default();
    }
}
exports.default = new RolesMiddleware;
