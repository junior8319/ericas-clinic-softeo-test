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
const Neighborhoods_service_1 = __importDefault(require("../services/Neighborhoods.service"));
class Neighborhoods {
    constructor() {
        this.getNeighborhoods = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const neighborhoodsList = yield this.service.getNeighborhoods();
                if (!neighborhoodsList)
                    return res.status(404).json({ message: 'Não encontramos bairros.' });
                return res.status(200).json(neighborhoodsList);
            }
            catch (error) {
                next(error);
            }
        });
        this.createNeighborhood = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const neighborhood = req.body;
                const createdNeighborhood = yield this.service.createNeighborhood(neighborhood);
                if (!createdNeighborhood) {
                    return res.status(400)
                        .json({ message: `Não foi possível criar o bairro com os dados: ${neighborhood}` });
                }
                return res.status(201).json(createdNeighborhood);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.updateNeighborhood = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!req.body)
                    return res.status(400).json({ message: 'Sem dado para atualizar' });
                const neighborhood = Object.assign(Object.assign({}, req.body), { id });
                yield this.service.updateNeighborhood(neighborhood);
                return res.status(200).json(neighborhood);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteNeighborhood = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return res.status(400).json({ message: 'Por favor, nos passe um identificador(id) para excluir.' });
                yield this.service.deleteNeighborhood(id);
                return res.status(202).json({ message: 'Registro excluído com sucesso.' });
            }
            catch (error) {
                next(error);
            }
        });
        this.service = new Neighborhoods_service_1.default();
    }
}
exports.default = new Neighborhoods();
