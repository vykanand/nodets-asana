"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initalizeDB = void 0;
const mongoose = require('mongoose');
async function initalizeDB() {
    await mongoose.connect('mongodb://localhost:27017/nodeasana');
    return mongoose.connection.readyState;
}
exports.initalizeDB = initalizeDB;
