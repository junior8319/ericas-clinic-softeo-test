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
const Countries_service_1 = __importDefault(require("../services/Countries.service"));
class CountriesMiddleware {
    constructor() {
        this.validateCreateCountry = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const countryToCreate = req.body;
                const { name } = countryToCreate;
                const countryExists = yield Countries_service_1.default.countryExists(name);
                if (countryExists)
                    return res.status(400)
                        .json({ message: `Já existe país com o nome ${name}` });
                if (!countryToCreate)
                    return res.status(400)
                        .json({ message: 'Nenhum dado recebido.' });
                this.name = countryToCreate.name;
                if (!this.name || this.name.length === 0)
                    return res.status(400)
                        .json({ message: 'Favor informar o nome da país (campo "name")' });
                this.phoneCode = countryToCreate.phoneCode;
                if (!this.phoneCode || this.phoneCode.length === 0)
                    return res.status(400)
                        .json({ message: 'Favor informar o código de área telefônico do país (campo "phoneCode")' });
                this.continent = countryToCreate.continent;
                if (!this.continent || this.continent.length === 0)
                    return res.status(400)
                        .json({ message: 'Favor informar o continente de localização do país (campo "continent")' });
                next();
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.validateUpdateCountry = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const countryToUpdate = req.body;
                const { name, phoneCode, continent } = countryToUpdate;
                if (!countryToUpdate || !name && !phoneCode && !continent)
                    return res.status(400)
                        .json({ message: 'Sem dado para atualizar' });
                const { id } = req.params;
                if (!id || !Number(id))
                    return res.status(400)
                        .json({ message: 'Por favor, nos passe um identificador(id) numérico para atualizar.' });
                const foundCountry = yield Countries_service_1.default.getCountryById(Number(id));
                if (!foundCountry)
                    return res.status(400)
                        .json({
                        message: `Identificador informado (id: ${id}) não encontrado.` +
                            ' Favor informar id válido',
                    });
                const countryExists = yield Countries_service_1.default.countryExists(name);
                if (countryExists)
                    return res.status(400)
                        .json({ message: `Já existe país com o nome ${name}` });
                next();
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.validateDeleteCountry = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id || !Number(id))
                    return res.status(400)
                        .json({ message: 'Por favor, nos passe um identificador(id) numérico para excluir.' });
                const foundCountry = yield Countries_service_1.default.getCountryById(Number(id));
                if (!foundCountry)
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
        this.service = new Countries_service_1.default();
    }
}
exports.default = new CountriesMiddleware;
