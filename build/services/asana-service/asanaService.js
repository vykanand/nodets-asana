"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asanaService = void 0;
const asana = __importStar(require("asana"));
const axisoUtils_1 = require("../../utils/axisoUtils");
const asanaLocalDbService_1 = require("../asana-local-db/asanaLocalDbService");
//Usually a good practice to seperate the functional responsibilities with help of services
//Also its crucial to define the Return type so that we only return intended value
//Note: Always use business logic in service layer.So we will be doing our LocalDB caching operations here. 
class asanaService {
    async fetchprojects(patValue, workspaceID, caching) {
        if (caching == 'disallowed') {
            const client = this.createClient(patValue);
            const clientResponse = await client.projects.findAll({ "workspace": workspaceID }).then((resp) => resp.data);
            let returnResponse = clientResponse;
            await (0, asanaLocalDbService_1.saveProjectData)(clientResponse);
            return returnResponse;
        }
        else if (caching == 'allowed') {
            return (0, asanaLocalDbService_1.fetchLocalProjectData)();
        }
    }
    async fetchtasks(patValue, projectID, caching) {
        if (caching == 'disallowed') {
            const config = {
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + patValue
                }
            };
            const serviceUrl = 'https://app.asana.com/api/1.0/projects/' + projectID + '/tasks';
            const taskResponse = await (0, axisoUtils_1.getTasksService)(serviceUrl, config);
            taskResponse.forEach((value) => {
                value.projectID = projectID;
            });
            (0, asanaLocalDbService_1.saveTaskData)(taskResponse);
            return taskResponse;
        }
        else if (caching == 'allowed') {
            return (0, asanaLocalDbService_1.fetchLocalProjectTasks)(projectID);
        }
    }
    async completeTask(patValue, taskID) {
        const client = this.createClient(patValue);
        return client.tasks.updateTask(taskID, { completed: true }).then((resp) => resp);
    }
    createClient(patValue) {
        return asana.Client.create({ defaultHeaders: { 'Asana-Disable': 'new_user_task_lists,new_project_templates' } }).useAccessToken(patValue);
    }
}
exports.asanaService = asanaService;
