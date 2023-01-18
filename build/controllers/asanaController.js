"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asanaController = void 0;
const responseUtil_1 = require("../utils/responseUtil");
const commonUtils_1 = require("../utils/commonUtils");
const asanaService_1 = require("../services/asana-service/asanaService");
class asanaController {
    constructor() {
        this.serviceObject = new asanaService_1.asanaService();
    }
    async getProjects(request, response) {
        try {
            const patToken = (0, commonUtils_1.processToken)(response, request.headers['authorization']);
            const { workspaceID } = request.params;
            const caching = request.query.caching;
            (0, responseUtil_1.checkParams)(response, caching, workspaceID);
            const serviceCall = await this.serviceObject.fetchprojects(patToken, workspaceID, caching);
            const workspaceData = (0, commonUtils_1.jsonToString)(serviceCall);
            (0, responseUtil_1.sendResponse)(response, workspaceData, 200);
        }
        catch (error) {
            (0, responseUtil_1.sendError)(response, error, 400);
        }
    }
    async getTasks(request, response) {
        const patToken = (0, commonUtils_1.processToken)(response, request.headers['authorization']);
        const { projectID } = request.params;
        const caching = request.query.caching;
        (0, responseUtil_1.checkParams)(response, caching, projectID);
        try {
            const serviceCall = await this.serviceObject.fetchtasks(patToken, projectID, caching);
            const projectData = (0, commonUtils_1.jsonToString)(serviceCall);
            (0, responseUtil_1.sendResponse)(response, projectData, 200);
        }
        catch (error) {
            (0, responseUtil_1.sendError)(response, error, 400);
        }
    }
    async completeTask(request, response) {
        const patToken = (0, commonUtils_1.processToken)(response, request.headers['authorization']);
        const { taskID } = request.body;
        try {
            const serviceCall = await this.serviceObject.completeTask(patToken, taskID);
            const taskData = (0, commonUtils_1.jsonToString)(serviceCall);
            (0, responseUtil_1.sendResponse)(response, taskData, 200);
        }
        catch (error) {
            (0, responseUtil_1.sendError)(response, error, 400);
        }
    }
}
exports.asanaController = asanaController;
