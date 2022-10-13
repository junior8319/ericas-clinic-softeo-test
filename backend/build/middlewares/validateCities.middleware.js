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
const Cities_service_1 = __importDefault(require("../services/Cities.service"));
class CitiesMiddleware {
    constructor() {
        this.validateCreateCity = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const cityToCreate = req.body;
                if (!cityToCreate || Object.keys(cityToCreate).length === 0)
                    return res
                        .status(400).json({ message: 'Nenhum dado recebido.' });
                const { name } = cityToCreate;
                this.name = cityToCreate.name;
                if (!this.name || this.name.length === 0)
                    return res.status(400)
                        .json({ message: 'Favor informar o nome da cidade (campo "name")' });
                const cityExists = yield Cities_service_1.default.cityExists(name);
                if (cityExists)
                    return res.status(400)
                        .json({ message: `Já existe cidade com o nome ${name}` });
                this.phoneCode = cityToCreate.phoneCode;
                if (!this.phoneCode || this.phoneCode.length === 0)
                    return res.status(400)
                        .json({ message: 'Favor informar o código de área telefônico da cidade (campo "phoneCode")' });
                this.state = cityToCreate.state;
                if (!this.state || this.state.length === 0)
                    return res.status(400)
                        .json({ message: 'Favor informar o estado onde se localiza a cidade (campo "state")' });
                this.countryId = cityToCreate.countryId;
                if (!this.countryId || this.countryId === 0)
                    return res.status(400).json({
                        message: 'Favor informar o identificador (id) válido de um país.'
                    });
                next();
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.validateUpdateCity = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const cityToUpdate = req.body;
                const { name, phoneCode, state } = cityToUpdate;
                if (!cityToUpdate || !name && !phoneCode && !state)
                    return res.status(400)
                        .json({ message: 'Sem dado para atualizar' });
                const { id } = req.params;
                if (!id || !Number(id))
                    return res.status(400)
                        .json({ message: 'Por favor, nos passe um identificador(id) numérico para atualizar.' });
                const foundCity = yield Cities_service_1.default.getCityById(Number(id));
                if (!foundCity)
                    return res.status(400)
                        .json({
                        message: `Identificador informado (id: ${id}) não encontrado.` +
                            ' Favor informar id válido',
                    });
                const cityExists = yield Cities_service_1.default.cityExists(name);
                if (cityExists)
                    return res.status(400)
                        .json({ message: `Já existe cidade com o nome ${name}` });
                next();
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.validateDeleteCity = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id || !Number(id))
                    return res.status(400)
                        .json({ message: 'Por favor, nos passe um identificador(id) numérico para excluir.' });
                const foundCity = yield Cities_service_1.default.getCityById(Number(id));
                if (!foundCity)
                    return res.status(400)
                        .json({
                        message: `Identificador informado (id: ${id}) não encontrado.` +
                            ' Favor informar id válido',
                    });
                next();
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.app = (0, express_1.default)();
        this.service = new Cities_service_1.default();
    }
}
exports.default = new CitiesMiddleware;
