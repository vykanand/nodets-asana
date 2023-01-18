"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasksService = void 0;
const axios_1 = __importDefault(require("axios"));
const getTasksService = async (url, config) => {
    return await axios_1.default.get(url, config).then(res => res.data.data);
};
exports.getTasksService = getTasksService;
