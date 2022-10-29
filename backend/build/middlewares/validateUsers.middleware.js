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
const Users_service_1 = __importDefault(require("../services/Users.service"));
class UsersMiddleware {
    constructor() {
        this.validateCreateUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userToCreate = req.body;
                if (!userToCreate || Object.keys(userToCreate).length === 0) {
                    return res.status(400).json({ message: 'Nenhum dado recebido.' });
                }
                const { cpf } = userToCreate;
                this.cpf = cpf;
                if (!this.cpf || this.cpf.length === 0 || !this.cpf.length) {
                    return res.status(400)
                        .json({
                        message: 'Favor informar o número de cpf da pessoa usuária (campo "cpf")',
                    });
                }
                const userExists = yield Users_service_1.default.userExists(this.cpf);
                if (userExists)
                    return res.status(400)
                        .json({
                        message: `Já existe pessoa usuária com o cpf número ${this.cpf}`
                    });
                const { name } = userToCreate;
                this.name = name;
                if (!this.name || !this.name.length || this.name.length === 0) {
                    return res.status(400)
                        .json({
                        message: 'Favor informar o nome da pessoa usuária (campo "name")',
                    });
                }
                const { birthDate } = userToCreate;
                this.birthDate = birthDate;
                if (!this.birthDate || !this.birthDate.toLocaleDateString('pt-BR')) {
                    return res.status(400)
                        .json({
                        message: 'Favor informar uma data de nascimento (campo "birthDate")' +
                            ' no formato "dd/mm/aaa"',
                    });
                }
                const { rg } = userToCreate;
                this.rg = rg;
                if (!this.rg || !this.rg.length || this.rg.length === 0) {
                    return res.status(400)
                        .json({
                        message: 'Favor informar uma data de nascimento (campo "rg")',
                    });
                }
                const { roleId } = userToCreate;
                this.roleId = Number(roleId);
                if (!this.roleId || !Number(roleId)) {
                    return res.status(400)
                        .json({
                        message: 'Favor informar a função da pessoa usuária' +
                            ' (campo "roleId") numérico.'
                    });
                }
                next();
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.validateUpdateUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userToUpdate = req.body;
                const { name, birthDate, cpf, rg, roleId } = userToUpdate;
                if (!userToUpdate ||
                    !name &&
                        !birthDate &&
                        !cpf &&
                        !rg &&
                        !roleId) {
                    return res.status(400).json({
                        message: 'Sem dado para atualizar'
                    });
                }
                const { id } = req.params;
                if (!id || !Number(id))
                    return res.status(400)
                        .json({
                        message: 'Por favor, nos informe um identificador(id)' +
                            ' numérico para atualizar',
                    });
                this.id = Number(id);
                const foundUser = yield Users_service_1.default.getUserById(this.id);
                if (!foundUser)
                    return res.status(400)
                        .json({
                        message: `Não temos registro com este identificador (id: ${this.id}` +
                            ' em nosso banco de dados. Favor informar id válido.'
                    });
                if (!cpf)
                    return next();
                this.cpf = cpf;
                const userExists = yield Users_service_1.default.userExists(this.cpf);
                if (userExists)
                    return res.status(400)
                        .json({ message: `Já existe pessoa cadastrada com o cpf ${cpf}` });
                next();
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.validateDeleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                this.id = Number(id);
                if (!id || !Number(id))
                    return res.status(400)
                        .json({
                        message: 'Por favor, nos passe um identificador (id) numérico para excluir.',
                    });
                const foundUser = yield Users_service_1.default.getUserById(this.id);
                if (!foundUser)
                    return res.status(400)
                        .json({
                        message: `Identificador informado (id: ${this.id} não encontrado.` +
                            ' Favor informar id válido.',
                    });
                next();
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.app = (0, express_1.default)();
        this.service = new Users_service_1.default();
    }
}
exports.default = new UsersMiddleware();
