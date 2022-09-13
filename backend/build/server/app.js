"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
class App {
    constructor() {
        this.start = (PORT) => {
            try {
                this.app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
            }
            catch (error) {
                console.log(error);
            }
        };
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json());
        // this.app.use(); // here goes the routers of this backend project
        this.app.get('/', (_req, res) => res.send('It works if you\'re seeing this'));
    }
}
exports.App = App;
