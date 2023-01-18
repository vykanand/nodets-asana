"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonToString = exports.processToken = void 0;
const processToken = (response, inputToken) => {
    if (!inputToken) {
        throw new Error('Invalid token');
    }
    else {
        return inputToken.substring(7, inputToken.length);
    }
};
exports.processToken = processToken;
const jsonToString = (str) => {
    return JSON.stringify(str);
};
exports.jsonToString = jsonToString;
