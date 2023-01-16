import axios from 'axios';
import { requestConfig } from '../models/asana/requestConfig';
import { tasksData } from '../models/asana/taskModel';

export const getTasksService = async (url: string, config: requestConfig): Promise<tasksData[]> => {
    return await axios.get<any>(
        url,
        config,
    ).then(res => res.data.data);
};