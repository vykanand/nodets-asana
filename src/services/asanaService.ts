import * as asana from 'asana';
import { workspaceData, workspaces } from '../models/asana/workspaceData';
import { requestConfig } from '../models/asana/requestConfig';
import { getService } from '../utils/axisoUtils';

//Usually a good practice to seperate the functional responsibilities with help of services
//Also its crucial to define the Return type so that we only return intended value
export class asanaService {
    async fetchworkspace(patValue: string): Promise<workspaceData> {
        const client = asana.Client.create().useAccessToken(patValue);
        return client.users.me().then((resp) => {
            return resp;
        });
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
}