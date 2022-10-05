"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersAddressesRouter = exports.usersPhonesRouter = exports.attendancesRouter = exports.usersRouter = exports.publicPlacesRouter = exports.telephonesRouter = exports.neighborhoodsRouter = exports.citiesRouter = exports.rolesRouter = exports.countriesRouter = void 0;
const countries_routes_1 = __importDefault(require("./countries.routes"));
exports.countriesRouter = countries_routes_1.default;
const roles_routes_1 = __importDefault(require("./roles.routes"));
exports.rolesRouter = roles_routes_1.default;
const cities_routes_1 = __importDefault(require("./cities.routes"));
exports.citiesRouter = cities_routes_1.default;
const neighborhoods_routes_1 = __importDefault(require("./neighborhoods.routes"));
exports.neighborhoodsRouter = neighborhoods_routes_1.default;
const telephones_routes_1 = __importDefault(require("./telephones.routes"));
exports.telephonesRouter = telephones_routes_1.default;
const publicPlaces_routes_1 = __importDefault(require("./publicPlaces.routes"));
exports.publicPlacesRouter = publicPlaces_routes_1.default;
const users_routes_1 = __importDefault(require("./users.routes"));
exports.usersRouter = users_routes_1.default;
const attendances_routes_1 = __importDefault(require("./attendances.routes"));
exports.attendancesRouter = attendances_routes_1.default;
const usersPhones_routes_1 = __importDefault(require("./usersPhones.routes"));
exports.usersPhonesRouter = usersPhones_routes_1.default;
const usersAddresses_routes_1 = __importDefault(require("./usersAddresses.routes"));
exports.usersAddressesRouter = usersAddresses_routes_1.default;
