import * as asana from 'asana';
import { projects } from '../../models/asana/projectsModel';
import { taskModel, tasksData } from '../../models/asana/taskModel';
import { requestConfig } from '../../models/asana/requestConfig';
import { getTasksService } from '../../utils/axisoUtils';
import { serviceInterface } from '../../models/asana/serviceModel';
import { saveProjectData, saveTaskData, fetchLocalProjectData, fetchLocalProjectTasks } from '../asana-local-db/asanaLocalDbService';

//Usually a good practice to seperate the functional responsibilities with help of services
//Also its crucial to define the Return type so that we only return intended value

//Note: Always use business logic in service layer.So we will be doing our LocalDB caching operations here. 
export class AsanaService implements serviceInterface {
    async fetchprojects(patValue: string, workspaceID: string, caching: string): Promise<projects[]> {
        if (caching == 'disallowed') {
            const client = this.createClient(patValue);
            const clientResponse = await client.projects.findAll({ "workspace": workspaceID }).then((resp) => resp.data);
            let returnResponse: projects[] = clientResponse;
            await saveProjectData(clientResponse);
            return returnResponse;
        } else if (caching == 'allowed') {
            return fetchLocalProjectData();
        }
    }

    async fetchtasks(patValue: string, projectID: string, caching: string): Promise<tasksData[]> {
        if (caching == 'disallowed') {
            const config: requestConfig = {
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + patValue
                }
            };
            const serviceUrl = 'https://app.asana.com/api/1.0/projects/' + projectID + '/tasks';
            const taskResponse = await getTasksService(serviceUrl, config);
            taskResponse.forEach((value) => {
                value.projectID = projectID
            });
            saveTaskData(taskResponse);
            return taskResponse;
        } else if (caching == 'allowed') {
            return fetchLocalProjectTasks(projectID);
        }

    }

    async completeTask(patValue: string, taskID: string): Promise<taskModel[] | any> {
        const client = this.createClient(patValue);
        return client.tasks.updateTask(taskID, { completed: true }).then((resp) => resp);
    }

    createClient(patValue) {
        return asana.Client.create({ defaultHeaders: { 'Asana-Disable': 'new_user_task_lists,new_project_templates' } }).useAccessToken(patValue)
    }

}