"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkParams = exports.sendError = exports.sendResponse = void 0;
// Passing message as type string to keep the response utility lightweight
const sendResponse = (response, message, statuscode) => {
    return response.status(statuscode).json(JSON.parse(message));
};
exports.sendResponse = sendResponse;
const sendError = (response, error, statuscode) => {
    return response.status(statuscode).json(error);
};
exports.sendError = sendError;
const checkParams = (response, ...args) => {
    args.includes(undefined) ? (() => { return response.status(400).json('Invalid params'); })() : (() => { return; });
};
exports.checkParams = checkParams;
