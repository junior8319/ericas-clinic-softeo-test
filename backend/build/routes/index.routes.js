"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.neighborhoodsRouter = exports.citiesRouter = exports.rolesRouter = exports.countriesRouter = void 0;
const countries_routes_1 = __importDefault(require("./countries.routes"));
exports.countriesRouter = countries_routes_1.default;
const roles_routes_1 = __importDefault(require("./roles.routes"));
exports.rolesRouter = roles_routes_1.default;
const cities_routes_1 = __importDefault(require("./cities.routes"));
exports.citiesRouter = cities_routes_1.default;
const neighborhoods_routes_1 = __importDefault(require("./neighborhoods.routes"));
exports.neighborhoodsRouter = neighborhoods_routes_1.default;
