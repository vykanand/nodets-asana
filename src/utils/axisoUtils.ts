import axios from 'axios';
import { requestConfig } from '../models/asana/requestConfig';
import { workspaces } from '../models/asana/workspaceData';

export const getService = async (url: string, config: requestConfig): Promise<workspaces[]> => {
    return await axios.get<workspaces[]>(
        url,
        config,
    ).then(res => res.data);
};