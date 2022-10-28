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
const Country_model_1 = __importDefault(require("../database/models/Country.model"));
class Cities {
    constructor() {
        this.getCities = () => __awaiter(this, void 0, void 0, function* () {
            const cities = yield City_model_1.default.findAll({
                include: { model: Country_model_1.default, as: 'country', attributes: { exclude: ['id'] } },
            });
            if (!cities)
                return null;
            return cities;
        });
        this.createCity = (city) => __awaiter(this, void 0, void 0, function* () {
            if (!city)
                return null;
            this.name = city.name;
            const cityExists = yield Cities.cityExists(this.name);
            if (cityExists)
                return null;
            const createdCity = yield City_model_1.default.create(Object.assign({}, city));
            return createdCity;
        });
        this.updateCity = (city) => __awaiter(this, void 0, void 0, function* () {
            if (!city)
                return null;
            if (city.id)
                this.id = city.id;
            const cityToUpdate = yield City_model_1.default.findOne({ where: { id: this.id } });
            if (!cityToUpdate)
                return null;
            if (city.name) {
                yield cityToUpdate.update({
                    name: city.name,
                });
            }
            if (city.countryId) {
                yield cityToUpdate.update({
                    countryId: city.countryId,
                });
            }
            if (city.phoneCode) {
                yield cityToUpdate.update({
                    phoneCode: city.phoneCode,
                });
            }
            if (city.state) {
                yield cityToUpdate.update({
                    state: city.state,
                });
            }
            return cityToUpdate;
        });
        this.deleteCity = (receivedId) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedId)
                return null;
            this.id = Number(receivedId);
            const cityToDelete = yield City_model_1.default.findOne({ where: { id: this.id } });
            if (cityToDelete)
                yield cityToDelete.destroy();
            return cityToDelete;
        });
        Cities.model = new City_model_1.default();
    }
}
_a = Cities;
Cities.cityExists = (receivedName) => __awaiter(void 0, void 0, void 0, function* () {
    const city = yield City_model_1.default.findOne({
        where: { name: receivedName },
    });
    const exists = !!city;
    return exists;
});
Cities.getCityById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const foundCity = yield City_model_1.default.findByPk(id);
    if (!foundCity)
        return null;
    return foundCity;
});
exports.default = Cities;
