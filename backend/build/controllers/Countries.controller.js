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
const Countries_service_1 = __importDefault(require("../services/Countries.service"));
class Countries {
    constructor() {
        this.getCountries = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const countriesList = yield this.service.getCountries();
                if (!countriesList)
                    return res.status(404).json({ message: 'Não encontramos países.' });
                return res.status(200).json(countriesList);
            }
            catch (error) {
                next(error);
            }
        });
        this.createCountry = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const country = req.body;
                const createdCountry = yield this.service.createCountry(country);
                if (!createdCountry) {
                    return res.status(400)
                        .json({ message: `Não foi possível criar o país com os dados: ${country}` });
                }
                return res.status(201).json(createdCountry);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.updateCountry = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!req.body)
                    return res.status(400).json({ message: 'Sem dado para atualizar' });
                const country = Object.assign(Object.assign({}, req.body), { id });
                yield this.service.updateCountry(country);
                return res.status(200).json(country);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteCountry = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.service.deleteCountry(id);
                return res.status(202).json({ message: 'Registro excluído com sucesso.' });
            }
            catch (error) {
                next(error);
            }
        });
        this.service = new Countries_service_1.default();
    }
}
exports.default = new Countries();
