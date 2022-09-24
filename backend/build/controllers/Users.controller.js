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
const Users_service_1 = __importDefault(require("../services/Users.service"));
class Users {
    constructor() {
        this.getUsers = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const usersList = yield this.service.getUsers();
                if (!usersList)
                    return res.status(404)
                        .json({ message: 'Não encontramos pessoas usuárias.' });
                return res.status(200).json(usersList);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.createUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = req.body;
                console.log(typeof newUser.cpf);
                const createdUser = yield this.service.createUser(newUser);
                if (!createdUser) {
                    return res.status(400)
                        .json({
                        message: `Não foi possível criar usuário com os dados ${newUser}`,
                    });
                }
                return res.status(201).json(createdUser);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.updateUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(typeof req.body);
                const { id } = req.params;
                if (!id || !req.body)
                    return res.status(400)
                        .json({ message: 'Sem dado para atualizar' });
                const user = Object.assign(Object.assign({}, req.body), { id });
                yield this.service.updateUser(user);
                return res.status(200).json(user);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return res.status(400)
                        .json({
                        message: 'Por favor, nos passe um identificador(id) para excluir.',
                    });
                const userDeleted = yield this.service.deleteUser(id);
                if (!userDeleted)
                    return res.status(404)
                        .json({ message: `Não encontramos usuário com o id ${id}` });
                return res.status(202).json({ message: 'Registro excluído com sucesso' });
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.service = new Users_service_1.default();
    }
}
exports.default = new Users();
