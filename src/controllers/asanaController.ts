import * as asana from 'asana';
import { Response, Request } from 'express';
import { sendResponse, sendError } from '../utils/responseUtil'
import { asanaService } from '../services/asanaService';
import { processToken, jsonToString } from '../utils/commonUtils';
export class asanaContoller {
    serviceObject = new asanaService();
    async getWorkspace(request: Request, response: Response) {
        const patToken = processToken(response, request.headers['authorization']);
        try {
            const serviceCall = await this.serviceObject.fetchworkspace(patToken);
            const workspaceData = jsonToString(serviceCall.workspaces);
            sendResponse(response, workspaceData, 200);
        } catch (error) {
            sendError(response, error, 400);
        }
    }

    async getTasks(request: Request, response: Response) {
        const patToken = processToken(response, request.headers['authorization']);
        const { projectID } = request.params;
        try {
            const serviceCall = await this.serviceObject.fetchtasks(patToken, projectID);
            const projectData = jsonToString(serviceCall);
            sendResponse(response, projectData, 200);
        } catch (error) {
            sendError(response, error, 400);
        }
    }

    async completeTask(request: Request, response: Response) {
        const patToken = processToken(response, request.headers['authorization']);
        const { taskID } = request.body;
        try {
            const serviceCall = await this.serviceObject.completeTask(patToken, taskID);
            const taskData = jsonToString(serviceCall);
            sendResponse(response, taskData, 200);
        } catch (error) {
            sendError(response, error, 400);
        }
    }

}