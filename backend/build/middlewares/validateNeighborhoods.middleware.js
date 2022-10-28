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
const Neighborhoods_service_1 = __importDefault(require("../services/Neighborhoods.service"));
class NeighborhoodsMiddleware {
    constructor() {
        this.validateCreateNeighborhood = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const neighborhoodToCreate = req.body;
                if (!neighborhoodToCreate ||
                    Object.keys(neighborhoodToCreate).length === 0) {
                    return res.status(400).json({ message: 'Nenhum dado recebido.' });
                }
                const { name, cityId } = neighborhoodToCreate;
                this.name = name;
                if (!this.name || this.name.length === 0)
                    return res.status(400)
                        .json({ message: 'Você deve informar o nome do bairro ("name")' });
                this.cityId = cityId;
                if (!this.cityId || !Number(this.cityId))
                    return res.status(400)
                        .json({
                        message: 'Você deve informar a cidade onde se localiza ("cityId") o bairro.'
                    });
                const neighborhoodExists = yield Neighborhoods_service_1.default
                    .neighborhoodExists(this.name, this.cityId);
                if (neighborhoodExists)
                    return res.status(400)
                        .json({
                        message: `Já existe bairro com o nome com os dados: ${neighborhoodToCreate}`
                    });
                next();
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.validateUpdateNeighborhood = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const neighborhoodToUpdate = req.body;
                const { name, cityId } = neighborhoodToUpdate;
                if (!neighborhoodToUpdate || !name && !cityId)
                    return res.status(400)
                        .json({ message: 'Sem dado para atualizar.' });
                const { id } = req.params;
                if (!id || !Number(id))
                    return res.status(400)
                        .json({
                        message: 'Por favor, nos informe um identificador (id) numérico para atualizar.',
                    });
                this.id = Number(id);
                const foundNeighborhood = yield Neighborhoods_service_1.default.getById(this.id);
                if (!foundNeighborhood)
                    return res.status(400)
                        .json({
                        message: `Identificador informado (id: ${id}) não encontrado` +
                            ' Favor informar id válido',
                    });
                if (!name || !cityId)
                    return next();
                const neighborhoodExists = yield Neighborhoods_service_1.default.neighborhoodExists(name, cityId);
                if (neighborhoodExists)
                    return res.status(400)
                        .json({
                        message: 'Já existe registro com esses dados, verifique por favor.',
                    });
                next();
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.validateDeleteNeighborhood = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id || !Number(id))
                    return res.status(400)
                        .json({
                        message: 'Por favor, nos informe um identificador (id) numérico para atualizar.',
                    });
                const foundNeighborhood = yield Neighborhoods_service_1.default.getById(Number(id));
                if (!foundNeighborhood)
                    return res.status(400)
                        .json({
                        message: `Identificador (id: ${id}) não corresponde a nenhum registro` +
                            ' Favor informar id válido para excluir.',
                    });
                next();
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.app = (0, express_1.default)();
        this.service = new Neighborhoods_service_1.default();
    }
}
exports.default = new NeighborhoodsMiddleware();
