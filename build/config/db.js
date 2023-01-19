"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initalizeDB = void 0;
const mongoose = require('mongoose');
async function initalizeDB() {
    await mongoose.connect(process.env.MONGODB_URI);
    return mongoose.connection.readyState;
}
exports.initalizeDB = initalizeDB;
