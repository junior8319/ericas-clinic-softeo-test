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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const City_model_1 = __importDefault(require("../database/models/City.model"));
const Telephone_model_1 = __importDefault(require("../database/models/Telephone.model"));
class Telephones {
    constructor() {
        this.getTelephones = () => __awaiter(this, void 0, void 0, function* () {
            const telephonesList = yield Telephone_model_1.default.findAll({
                include: [
                    { model: City_model_1.default, as: 'city' },
                ],
            });
            if (!telephonesList)
                return null;
            return telephonesList;
        });
        this.createTelephone = (telephone) => __awaiter(this, void 0, void 0, function* () {
            if (!telephone)
                return null;
            this.prefix = telephone.prefix;
            this.number = telephone.number;
            this.cityId = telephone.cityId;
            const telephoneExists = yield Telephones.telephoneExists(this.prefix, this.number, this.cityId);
            if (telephoneExists)
                return null;
            const createdTelephone = yield Telephone_model_1.default.create(Object.assign({}, telephone));
            return createdTelephone;
        });
        this.updateTelephone = (telephone) => __awaiter(this, void 0, void 0, function* () {
            if (!telephone)
                return null;
            if (telephone.id)
                this.id = telephone.id;
            const telephoneToUpdate = yield Telephone_model_1.default.findOne({ where: { id: this.id } });
            if (!telephoneToUpdate)
                return null;
            if (telephone.prefix) {
                yield telephoneToUpdate.update({
                    prefix: telephone.prefix,
                });
            }
            if (telephone.number) {
                yield telephoneToUpdate.update({
                    number: telephone.number,
                });
            }
            if (telephone.cityId) {
                yield telephoneToUpdate.update({
                    cityId: telephone.cityId,
                });
            }
            return telephoneToUpdate;
        });
        this.deleteTelephone = (receivedId) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedId)
                return null;
            this.id = Number(receivedId);
            const telephoneToDelete = yield Telephone_model_1.default.findOne({ where: { id: this.id } });
            if (telephoneToDelete)
                yield telephoneToDelete.destroy();
            return telephoneToDelete;
        });
        Telephones.model = new Telephone_model_1.default();
    }
}
_a = Telephones;
Telephones.getPhoneById = (receivedId) => __awaiter(void 0, void 0, void 0, function* () {
    const telephone = yield Telephone_model_1.default.findByPk(receivedId);
    if (!telephone)
        return null;
    return telephone;
});
Telephones.telephoneExists = (receivedPrefix, receivedNumber, cityId) => __awaiter(void 0, void 0, void 0, function* () {
    const telephone = yield Telephone_model_1.default.findOne({
        where: {
            prefix: receivedPrefix,
            number: receivedNumber,
            cityId: cityId,
        },
    });
    const exists = !!telephone;
    return exists;
});
exports.default = Telephones;
