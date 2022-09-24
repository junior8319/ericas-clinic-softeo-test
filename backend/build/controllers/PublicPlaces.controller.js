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
const PublicPlaces_service_1 = __importDefault(require("../services/PublicPlaces.service"));
class PublicPlaces {
    constructor() {
        this.getPublicPlaces = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const publicPlacesList = yield this.service.getPublicPlaces();
                if (!publicPlacesList)
                    return res.status(404).json({ message: 'Não encontramos logradouros.' });
                return res.status(200).json(publicPlacesList);
            }
            catch (error) {
                next(error);
            }
        });
        this.createPublicPlace = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const publicPlace = req.body;
                const createdPublicPlace = yield this.service.createPublicPlace(publicPlace);
                if (!createdPublicPlace) {
                    return res.status(400)
                        .json({ message: `Não foi possível criar o logradouro com os dados: ${publicPlace}` });
                }
                return res.status(201).json(createdPublicPlace);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.updatePublicPlace = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!req.body)
                    return res.status(400).json({ message: 'Sem dado para atualizar' });
                const publicPlace = Object.assign(Object.assign({}, req.body), { id });
                yield this.service.updatePublicPlace(publicPlace);
                return res.status(200).json(publicPlace);
            }
            catch (error) {
                next(error);
            }
        });
        this.deletePublicPlace = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return res.status(400).json({ message: 'Por favor, nos passe um identificador(id) para excluir.' });
                yield this.service.deletePublicPlace(id);
                return res.status(202).json({ message: 'Registro excluído com sucesso.' });
            }
            catch (error) {
                next(error);
            }
        });
        this.service = new PublicPlaces_service_1.default();
    }
}
exports.default = new PublicPlaces();
