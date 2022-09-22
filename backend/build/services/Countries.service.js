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
const Country_model_1 = __importDefault(require("../database/models/Country.model"));
class Countries {
    constructor() {
        this.getCountries = () => __awaiter(this, void 0, void 0, function* () {
            const countries = yield Country_model_1.default.findAll({ raw: true });
            if (!countries)
                return null;
            return countries;
        });
        this.createCountry = (country) => __awaiter(this, void 0, void 0, function* () {
            if (!country)
                return null;
            this.name = country.name;
            const countryExists = yield Countries.countryExists(this.name);
            if (countryExists)
                return null;
            const createdCountry = yield Country_model_1.default.create(Object.assign({}, country));
            return createdCountry;
        });
        this.updateCountry = (country) => __awaiter(this, void 0, void 0, function* () {
            if (!country)
                return null;
            if (country.id)
                this.id = country.id;
            const countryToUpdate = yield Country_model_1.default.findOne({ where: { id: this.id } });
            if (!countryToUpdate)
                return null;
            if (country.name) {
                yield countryToUpdate.update({
                    name: country.name,
                });
            }
            if (country.continent) {
                yield countryToUpdate.update({
                    continent: country.continent,
                });
            }
            if (country.phoneCode) {
                yield countryToUpdate.update({
                    phoneCode: country.phoneCode,
                });
            }
            return countryToUpdate;
        });
        this.deleteCountry = (receivedId) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedId)
                return null;
            this.id = Number(receivedId);
            const countryToDelete = yield Country_model_1.default.findOne({ where: { id: this.id } });
            if (countryToDelete)
                yield countryToDelete.destroy();
            return countryToDelete;
        });
        Countries.model = new Country_model_1.default();
    }
}
_a = Countries;
Countries.countryExists = (receivedName) => __awaiter(void 0, void 0, void 0, function* () {
    const country = yield Country_model_1.default.findOne({
        where: { name: receivedName },
    });
    const exists = !!country;
    return exists;
});
exports.default = Countries;
