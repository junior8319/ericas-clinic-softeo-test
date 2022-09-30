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
const UsersPhones_service_1 = __importDefault(require("../services/UsersPhones.service"));
class UsersPhones {
    constructor() {
        this.getUsersPhones = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const usersPhonesList = yield this.service.getUsersPhones();
                if (!usersPhonesList)
                    return res.status(404)
                        .json({ message: 'Não encontramos telefones associados a pessoas' });
                return res.status(200).json(usersPhonesList);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.createUserPhone = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newUserPhone = req.body;
                const createdUserPhone = yield this.service
                    .createUserPhone(newUserPhone);
                if (!createdUserPhone)
                    return res.status(400).json({
                        message: `Não foi possível associar com os dados ${newUserPhone}`
                    });
                return res.status(201).json(createdUserPhone);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.service = new UsersPhones_service_1.default();
    }
}
exports.default = new UsersPhones();
