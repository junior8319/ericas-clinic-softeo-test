"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const attendances_routes_1 = __importDefault(require("../routes/attendances.routes"));
const index_routes_1 = require("../routes/index.routes");
class App {
    constructor() {
        this.middlewares = () => {
            this.app.use((0, express_1.json)());
        };
        this.listen = (port) => {
            this.app.listen(port, () => console.log(`Servidor rodando na porta: ${port}`));
        };
        this.app = (0, express_1.default)();
        this.config();
        this.app.use(index_routes_1.countriesRouter);
        this.app.use(index_routes_1.rolesRouter);
        this.app.use(index_routes_1.citiesRouter);
        this.app.use(index_routes_1.neighborhoodsRouter);
        this.app.use(index_routes_1.telephonesRouter);
        this.app.use(index_routes_1.publicPlacesRouter);
        this.app.use(index_routes_1.usersRouter);
        this.app.use(attendances_routes_1.default);
        this.app.use(index_routes_1.usersPhonesRouter);
        this.app.use(index_routes_1.usersAddressesRouter);
        this.middlewares();
        this.app.get('/', (_req, res) => res.send('Hello, World!'));
    }
    ;
    config() {
        const accessControl = (_req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        };
        this.app.use(accessControl);
        this.app.use(express_1.default.json());
    }
}
exports.default = new App();
