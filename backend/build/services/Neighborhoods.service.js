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
const Neighborhood_model_1 = __importDefault(require("../database/models/Neighborhood.model"));
class Neighborhoods {
    constructor() {
        this.getNeighborhoods = () => __awaiter(this, void 0, void 0, function* () {
            const neighborhoods = yield Neighborhood_model_1.default.findAll({
                include: [
                    { model: City_model_1.default, as: 'city', attributes: { exclude: ['id'] } },
                ],
            });
            if (!neighborhoods)
                return null;
            return neighborhoods;
        });
        this.createNeighborhood = (neighborhood) => __awaiter(this, void 0, void 0, function* () {
            if (!neighborhood)
                return null;
            this.name = neighborhood.name;
            this.cityId = neighborhood.cityId;
            const neighborhoodExists = yield Neighborhoods.neighborhoodExists(this.name, this.cityId);
            if (neighborhoodExists)
                return null;
            const createdNeighborhood = yield Neighborhood_model_1.default.create(Object.assign({}, neighborhood));
            return createdNeighborhood;
        });
        this.updateNeighborhood = (neighborhood) => __awaiter(this, void 0, void 0, function* () {
            if (!neighborhood)
                return null;
            if (neighborhood.id)
                this.id = neighborhood.id;
            const neighborhoodToUpdate = yield Neighborhood_model_1.default.findOne({ where: { id: this.id } });
            if (!neighborhoodToUpdate)
                return null;
            if (neighborhood.name) {
                yield neighborhoodToUpdate.update({
                    name: neighborhood.name,
                });
            }
            if (neighborhood.cityId) {
                yield neighborhoodToUpdate.update({
                    cityId: neighborhood.cityId,
                });
            }
            return neighborhoodToUpdate;
        });
        this.deleteNeighborhood = (receivedId) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedId)
                return null;
            this.id = Number(receivedId);
            const neighborhoodToDelete = yield Neighborhood_model_1.default.findOne({ where: { id: this.id } });
            if (neighborhoodToDelete)
                yield neighborhoodToDelete.destroy();
            return neighborhoodToDelete;
        });
        Neighborhoods.model = new Neighborhood_model_1.default();
    }
}
_a = Neighborhoods;
Neighborhoods.neighborhoodExists = (receivedName, receivedCityId) => __awaiter(void 0, void 0, void 0, function* () {
    const neighborhood = yield Neighborhood_model_1.default.findOne({
        where: {
            name: receivedName,
            cityId: receivedCityId,
        },
    });
    const exists = !!neighborhood;
    return exists;
});
Neighborhoods.getById = (receivedId) => __awaiter(void 0, void 0, void 0, function* () {
    const neighborhood = yield Neighborhood_model_1.default.findByPk(receivedId);
    if (!neighborhood)
        return null;
    return neighborhood;
});
exports.default = Neighborhoods;
