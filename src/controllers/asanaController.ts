import { Response, Request } from 'express';
import { sendResponse, sendError, checkParams } from '../utils/responseUtil';
import { processToken, jsonToString, cl } from '../utils/commonUtils';
import { AsanaService } from '../services/asana-service/asanaService';

export class AsanaController {
    serviceObject = new AsanaService();
    async getProjects(request: Request, response: Response): Promise<void> {
        try {
            const patToken = processToken(request.headers['authorization']);
            const { workspaceID } = request.params;
            const caching = request.query.caching as string;
            checkParams(response, caching, workspaceID);
            const serviceCall = await this.serviceObject.fetchprojects(patToken, workspaceID, caching);
            const workspaceData = jsonToString(serviceCall);
            sendResponse(response, workspaceData, 200);
        } catch (error) {
            sendError(response, error, 400);
        }
    }

    async getTasks(request: Request, response: Response): Promise<void> {
         
        const patToken = processToken(request.headers['authorization']);
        const { projectID } = request.params;
        const caching = request.query.caching as string;
        checkParams(response, caching, projectID);
        try {
            const serviceCall = await this.serviceObject.fetchtasks(patToken, projectID, caching);
            cl(serviceCall)
            const projectData = jsonToString(serviceCall);
            cl(projectData)
            sendResponse(response, projectData, 200);
        } catch (error) {
            sendError(response, error, 400);
        }
    }

    async completeTask(request: Request, response: Response): Promise<void> {
        const patToken = processToken(request.headers['authorization']);
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