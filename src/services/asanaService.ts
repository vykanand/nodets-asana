import * as asana from 'asana';
import { workspaceData, workspaces } from '../models/asana/workspaceData';
import { taskModel } from '../models/asana/taskModel';
import { requestConfig } from '../models/asana/requestConfig';
import { getService } from '../utils/axisoUtils';

//Usually a good practice to seperate the functional responsibilities with help of services
//Also its crucial to define the Return type so that we only return intended value
export class asanaService {
    async fetchprojects(patValue: string, workspaceID: string) {
        const client = this.createClient(patValue);
        return client.projects.findAll({ "workspace": workspaceID }).then((resp) => resp);
    }

    async fetchtasks(patValue: string, projectID: string): Promise<workspaces[]> {
        const config: requestConfig = {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + patValue
            }
        };
        const serviceUrl = 'https://app.asana.com/api/1.0/projects/' + projectID + '/tasks';
        return getService(serviceUrl, config);
    }

    async completeTask(patValue: string, taskID: string): Promise<taskModel[] | any> {
        const client = this.createClient(patValue);
        return client.tasks.updateTask(taskID, { completed: true }).then((resp) => resp);
    }

    createClient(patValue) {
        return asana.Client.create().useAccessToken(patValue)
    }

}