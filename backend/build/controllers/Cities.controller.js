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
const Cities_service_1 = __importDefault(require("../services/Cities.service"));
class Cities {
    constructor() {
        this.getCities = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const citiesList = yield this.service.getCities();
                if (!citiesList)
                    return res.status(404).json({ message: 'Não encontramos cidades.' });
                return res.status(200).json(citiesList);
            }
            catch (error) {
                next(error);
            }
        });
        this.createCity = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const city = req.body;
                const createdCity = yield this.service.createCity(city);
                if (!createdCity) {
                    return res.status(400)
                        .json({ message: `Não foi possível criar a cidade com os dados: ${city}` });
                }
                return res.status(201).json(createdCity);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.updateCity = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!req.body)
                    return res.status(400).json({ message: 'Sem dado para atualizar' });
                const city = Object.assign(Object.assign({}, req.body), { id });
                yield this.service.updateCity(city);
                return res.status(200).json(city);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteCity = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.service.deleteCity(id);
                return res.status(202).json({ message: 'Registro excluído com sucesso.' });
            }
            catch (error) {
                next(error);
            }
        });
        this.service = new Cities_service_1.default();
    }
}
exports.default = new Cities();
