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
const Telephones_service_1 = __importDefault(require("../services/Telephones.service"));
class TelephonesMiddleware {
    constructor() {
        this.validateCreatePhone = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const phoneToCreate = req.body;
                const { prefix, number, cityId } = phoneToCreate;
                const phoneExists = yield Telephones_service_1.default.telephoneExists(prefix, number, cityId);
                if (phoneExists)
                    return res.status(400)
                        .json({ message: `Já existe número de telefone com os dados: ${phoneToCreate}` });
                if (!phoneToCreate)
                    return res.status(400)
                        .json({ message: 'Nenhum dado recebido.' });
                this.prefix = phoneToCreate.prefix;
                if (!this.prefix || !Number(this.prefix))
                    return res.status(400)
                        .json({ message: 'Prefixo do telefone não informado, informe "prefix"' });
                this.number = phoneToCreate.number;
                if (!this.number || !Number(this.number))
                    return res.status(400)
                        .json({ message: 'Número do telefone não informado, informe "number"' });
                this.cityId = cityId;
                if (!this.cityId || !Number(this.cityId))
                    return res.status(400)
                        .json({ message: 'É necessário informar o id da cidade, informe "cityId"' });
                next();
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.app = (0, express_1.default)();
        this.service = new Telephones_service_1.default();
    }
}
exports.default = new TelephonesMiddleware();