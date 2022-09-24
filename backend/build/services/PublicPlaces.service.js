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
const Neighborhood_model_1 = __importDefault(require("../database/models/Neighborhood.model"));
const PublicPlace_model_1 = __importDefault(require("../database/models/PublicPlace.model"));
class PublicPlaces {
    constructor() {
        this.getPublicPlaces = () => __awaiter(this, void 0, void 0, function* () {
            const publicPlacesList = yield PublicPlace_model_1.default.findAll({
                raw: true,
                include: [
                    { model: Neighborhood_model_1.default, as: 'neighborhood', attributes: { exclude: ['id'] } },
                ],
            });
            if (!publicPlacesList)
                return null;
            return publicPlacesList;
        });
        this.createPublicPlace = (publicPlace) => __awaiter(this, void 0, void 0, function* () {
            if (!publicPlace)
                return null;
            this.name = publicPlace.name;
            const publicPlaceExists = yield PublicPlaces.publicPlaceExists(this.name);
            if (publicPlaceExists)
                return null;
            const createdPublicPlace = yield PublicPlace_model_1.default.create(Object.assign({}, publicPlace));
            return createdPublicPlace;
        });
        this.updatePublicPlace = (publicPlace) => __awaiter(this, void 0, void 0, function* () {
            if (!publicPlace)
                return null;
            if (publicPlace.id)
                this.id = publicPlace.id;
            const publicPlaceToUpdate = yield PublicPlace_model_1.default.findOne({ where: { id: this.id } });
            if (!publicPlaceToUpdate)
                return null;
            if (publicPlace.name) {
                yield publicPlaceToUpdate.update({
                    name: publicPlace.name,
                });
            }
            if (publicPlace.type) {
                yield publicPlaceToUpdate.update({
                    type: publicPlace.type,
                });
            }
            if (publicPlace.neighborhoodId) {
                yield publicPlaceToUpdate.update({
                    neighborhoodId: publicPlace.neighborhoodId,
                });
            }
            return publicPlaceToUpdate;
        });
        this.deletePublicPlace = (receivedId) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedId)
                return null;
            this.id = Number(receivedId);
            const publicPlaceToDelete = yield PublicPlace_model_1.default.findOne({ where: { id: this.id } });
            if (publicPlaceToDelete)
                yield publicPlaceToDelete.destroy();
            return publicPlaceToDelete;
        });
        PublicPlaces.model = new PublicPlace_model_1.default();
    }
}
_a = PublicPlaces;
PublicPlaces.publicPlaceExists = (receivedName) => __awaiter(void 0, void 0, void 0, function* () {
    const publicPlace = yield PublicPlace_model_1.default.findOne({
        where: { name: receivedName },
    });
    const exists = !!publicPlace;
    return exists;
});
exports.default = PublicPlaces;
