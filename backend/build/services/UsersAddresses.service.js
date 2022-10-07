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
const UserAddress_model_1 = __importDefault(require("../database/models/UserAddress.model"));
class UsersAddresses {
    constructor() {
        this.getUsersAddresses = () => __awaiter(this, void 0, void 0, function* () {
            const usersAddressesList = yield UserAddress_model_1.default.findAll();
            if (!usersAddressesList)
                return null;
            return usersAddressesList;
        });
        this.createUserAddress = (userAddress) => __awaiter(this, void 0, void 0, function* () {
            if (!userAddress ||
                !userAddress.userId ||
                !userAddress.publicPlaceId ||
                !userAddress.addressNumber ||
                !userAddress.type)
                return null;
            const userAddressExists = yield UsersAddresses.userAddressExists(userAddress);
            if (userAddressExists)
                return null;
            const newUserAddress = UserAddress_model_1.default.create(Object.assign({}, userAddress));
            return newUserAddress;
        });
        this.updateUserAddress = (newData, prevData) => __awaiter(this, void 0, void 0, function* () {
            if (!newData ||
                !prevData ||
                !prevData.userId ||
                !prevData.publicPlaceId ||
                !prevData.addressNumber)
                return null;
            const userAddressToUpdate = yield UserAddress_model_1.default.findOne({
                where: {
                    userId: prevData.userId,
                    publicPlaceId: prevData.publicPlaceId,
                    addressNumber: prevData.addressNumber,
                },
            });
            if (!userAddressToUpdate)
                return null;
            if (newData.userId) {
                yield userAddressToUpdate.update({ userId: newData.userId });
            }
            if (newData.publicPlaceId) {
                yield userAddressToUpdate.update({
                    publicPlaceId: newData.publicPlaceId
                });
            }
            if (newData.addressNumber) {
                yield userAddressToUpdate.update({ addressNumber: newData.addressNumber });
            }
            if (newData.type) {
                yield userAddressToUpdate.update({ type: newData.type });
            }
            if (newData.addressComplement) {
                yield userAddressToUpdate.update({ addressComplement: newData.addressComplement });
            }
            if (newData.addressCompInfo) {
                yield userAddressToUpdate.update({ addressCompInfo: newData.addressCompInfo });
            }
            return userAddressToUpdate;
        });
        this.deleteUserAddress = (receivedUserAddress) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedUserAddress ||
                !receivedUserAddress.userId ||
                !receivedUserAddress.publicPlaceId ||
                !receivedUserAddress.addressNumber)
                return null;
            const userAddressToDelete = yield UserAddress_model_1.default.findOne({
                where: {
                    userId: receivedUserAddress.userId,
                    publicPlaceId: receivedUserAddress.publicPlaceId,
                    addressNumber: receivedUserAddress.addressNumber,
                },
            });
            if (!userAddressToDelete)
                return null;
            yield userAddressToDelete.destroy();
            return userAddressToDelete;
        });
        UsersAddresses.model = new UserAddress_model_1.default();
    }
}
_a = UsersAddresses;
UsersAddresses.userAddressExists = (receivedUserAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const userAddress = yield UserAddress_model_1.default.findOne({
        where: {
            userId: receivedUserAddress.userId,
            publicPlaceId: receivedUserAddress.publicPlaceId,
            addressNumber: receivedUserAddress.addressNumber,
            type: receivedUserAddress.type,
        },
    });
    const exists = !!userAddress;
    return exists;
});
exports.default = UsersAddresses;
