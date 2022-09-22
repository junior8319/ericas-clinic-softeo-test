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
const error_middleware_1 = __importDefault(require("../middlewares/error.middleware"));
const Roles_service_1 = __importDefault(require("../services/Roles.service"));
class Roles {
    constructor() {
        this.getRoles = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rolesList = yield this.service.getRoles();
                if (!rolesList)
                    return res.status(404).json({ message: 'Não encontramos atribuições de pessoas usuárias.' });
                return res.status(200).json(rolesList);
            }
            catch (error) {
                error_middleware_1.default.handleErrors();
            }
        });
        this.createRole = (req, res, _next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const role = req.body;
                const createdRole = yield this.service.createRole(role);
                if (!createdRole) {
                    return res.status(400)
                        .json({ message: `Não foi possível criar a função com os dados: ${role}` });
                }
                return res.status(201).json(createdRole);
            }
            catch (error) {
                console.log(error);
                return error_middleware_1.default.handleErrors();
            }
        });
        this.updateRole = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return res.status(400).json({ message: 'É necessário informar o identificador(id)' });
                if (!req.body)
                    return res.status(400).json({ message: 'Sem dado para atualizar' });
                const role = Object.assign(Object.assign({}, req.body), { id });
                yield this.service.updateRole(role);
                return res.status(200).json(role);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteRole = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return res.status(400).json({ message: 'Por favor, nos passe um identificador(id) para excluir.' });
                yield this.service.deleteRole(id);
                return res.status(202).json({ message: 'Registro excluído com sucesso.' });
            }
            catch (error) {
                next(error);
            }
        });
        this.service = new Roles_service_1.default();
    }
}
exports.default = new Roles();
