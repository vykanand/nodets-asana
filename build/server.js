"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const app_1 = require("./app");
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
app_1.app.use((0, cors_1.default)());
app_1.app.use((0, helmet_1.default)());
app_1.app.options('*', (0, cors_1.default)());
(async () => {
    const connectionStatus = await (0, db_1.initalizeDB)();
    connectionStatus == 1 ? app_1.app.listen(3333) : console.log('mongodb connection failed');
})();
