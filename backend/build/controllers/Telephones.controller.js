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
const Telephones_service_1 = __importDefault(require("../services/Telephones.service"));
class Telephones {
    constructor() {
        this.getTelephones = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const telephonesList = yield this.service.getTelephones();
                if (!telephonesList)
                    return res.status(404).json({ message: 'Não encontramos telefones.' });
                return res.status(200).json(telephonesList);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.createTelephone = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const telephone = req.body;
                const createdTelephone = yield this.service.createTelephone(telephone);
                if (!createdTelephone) {
                    return res.status(400)
                        .json({ message: `Não foi possível criar o telephone com os dados: ${telephone}` });
                }
                return res.status(201).json(createdTelephone);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.updateTelephone = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!req.body)
                    return res.status(400).json({ message: 'Sem dado para atualizar' });
                const telephone = Object.assign(Object.assign({}, req.body), { id });
                yield this.service.updateTelephone(telephone);
                return res.status(200).json(telephone);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.deleteTelephone = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return res.status(400).json({ message: 'Por favor, nos passe um identificador(id) para excluir.' });
                yield this.service.deleteTelephone(id);
                return res.status(202).json({ message: 'Registro excluído com sucesso.' });
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.service = new Telephones_service_1.default();
    }
}
exports.default = new Telephones();
