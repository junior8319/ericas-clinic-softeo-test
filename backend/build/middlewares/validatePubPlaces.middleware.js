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
const express_1 = __importDefault(require("express"));
class PublicPlacesMiddleware {
    constructor() {
        this.validateCreatePublicPlace = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const publicPlaceToCreate = req.body;
                if (!publicPlaceToCreate ||
                    Object.keys(publicPlaceToCreate).length === 0) {
                    return res.status(400).json({ message: 'Nenhum dado recebido.' });
                }
                const { name, type, neighborhoodId } = publicPlaceToCreate;
                this.neighborhoodId = Number(neighborhoodId);
                if (!this.neighborhoodId || !Number(this.neighborhoodId)) {
                    return res.status(400)
                        .json({
                        message: 'Você deve informar o bairro (neighborhoodId) onde' +
                            ' se localiza o logradouro (rua, av., etc.).' +
                            ' Deve ser um dado numérico.'
                    });
                }
                this.name = name;
                if (!this.name || this.name.length === 0)
                    return res.status(400)
                        .json({ message: 'Você deve informar o nome (name) do logradouro.' });
                this.type = type;
                if (!this.type || this.type.length === 0)
                    return res.status(400)
                        .json({
                        message: 'Você deve informar o tipo (type) de logradouro (rua, av., etc.).'
                    });
                next();
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.validateUpdatePublicPlace = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const pubPlaceToUpdate = req.body;
                const { name, type, neighborhoodId } = pubPlaceToUpdate;
                if (!pubPlaceToUpdate || !name && !neighborhoodId)
                    return res.status(400)
                        .json({ message: 'Sem dado para atualizar.' });
                const { id } = req.params;
                if (!id || !Number(id))
                    return res.status(400)
                        .json({
                        message: 'Por favor, nos informe um identificador (id) numérico para atualizar.'
                    });
                this.id = Number(id);
                const foundPublicPlace = yield PublicPlaces_service_1.default.getPubPlaceById(this.id);
                if (!foundPublicPlace)
                    return res.status(400)
                        .json({
                        message: `Identificador (id: ${this.id} não corresponde` +
                            ' a registros presentes no banco.' +
                            ' Favor informar id válido.',
                    });
                if (!name || !neighborhoodId)
                    return next();
                const publicPlaceExists = yield PublicPlaces_service_1.default
                    .publicPlaceExists(name, neighborhoodId);
                if (publicPlaceExists)
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
        this.validateDeletePublicPlace = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id || !Number(id))
                    return res.status(400)
                        .json({
                        message: 'Por favor, nos informe um identificador' +
                            ' (id) numérico para excluir.',
                    });
                this.id = Number(id);
                const foundPublicPlace = yield PublicPlaces_service_1.default.getPubPlaceById(Number(id));
                if (!foundPublicPlace)
                    res.status(400)
                        .json({
                        message: `Identificador informado (id: ${this.id} não corresponde` +
                            ' a nenhum logradouro cadastrado.' +
                            'Favor informar um id existente.',
                    });
                next();
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.app = (0, express_1.default)();
        this.service = new PublicPlaces_service_1.default();
    }
}
exports.default = new PublicPlacesMiddleware();
