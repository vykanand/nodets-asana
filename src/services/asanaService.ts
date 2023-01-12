import * as asana from 'asana';
import { projects } from '../models/asana/projectsModel';
import { taskModel, tasksData } from '../models/asana/taskModel';
import { requestConfig } from '../models/asana/requestConfig';
import { getService } from '../utils/axisoUtils';
import { serviceInterface } from '../models/asana/serviceModel';

//Usually a good practice to seperate the functional responsibilities with help of services
//Also its crucial to define the Return type so that we only return intended value
export class asanaService implements serviceInterface {
    async fetchprojects(patValue: string, workspaceID: string): Promise<projects[]> {
        const client = this.createClient(patValue);
        return await client.projects.findAll({ "workspace": workspaceID }).then((resp) => resp.data);
    }

    async fetchtasks(patValue: string, projectID: string): Promise<tasksData[]> {
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
        return asana.Client.create({ defaultHeaders: { 'Asana-Disable': 'new_user_task_lists,new_project_templates' } }).useAccessToken(patValue)
    }

}