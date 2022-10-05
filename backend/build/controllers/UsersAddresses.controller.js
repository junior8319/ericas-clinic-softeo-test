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
const UsersAddresses_service_1 = __importDefault(require("../services/UsersAddresses.service"));
class UsersAddresses {
    constructor() {
        this.getUsersAddresses = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const usersAddressesList = yield this.service.getUsersAddresses();
                if (!usersAddressesList)
                    return res.status(404)
                        .json({ message: 'Não encontramos endereços associados a pessoas' });
                return res.status(200).json(usersAddressesList);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.createUserAddress = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newUserAddress = req.body;
                const createdUserAddress = yield this.service.createUserAddress(newUserAddress);
                if (!createdUserAddress)
                    return res.status(400).json({
                        message: `Não foi possível associar com os dados ${newUserAddress}`
                    });
                return res.status(201).json(createdUserAddress);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.updateUserAddress = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, publicPlaceId, addressNumber } = req.params;
                this.userId = Number(userId);
                this.publicPlaceId = Number(publicPlaceId);
                this.addressNumber = Number(addressNumber);
                const newData = req.body;
                if (!userId || !publicPlaceId || !addressNumber) {
                    return res.status(400)
                        .json({
                        message: 'Favor informar dados para buscar (userId, publicPlaceId, addressNumber',
                    });
                }
                if (!newData) {
                    return res.status(400)
                        .json({
                        message: 'Favor informar dados para atualizar',
                    });
                }
                const updatedUserAddress = yield this.service.updateUserAddress(newData, {
                    userId: this.userId,
                    publicPlaceId: this.publicPlaceId,
                    addressNumber: this.addressNumber,
                });
                return res.status(200).json(updatedUserAddress);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.service = new UsersAddresses_service_1.default();
    }
}
exports.default = new UsersAddresses();
