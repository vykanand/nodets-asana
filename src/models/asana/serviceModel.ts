import { projects } from "./projectsModel";
import { taskModel, tasksData } from "./taskModel";
export interface serviceInterface {
    /**
     * Define Asana service boundries.
     */
    fetchprojects(patValue: string, workspaceID: string, caching: string): Promise<projects[]>;

    fetchtasks(patValue: string, projectID: string, caching: string): Promise<tasksData[]>;

    completeTask(patValue: string, taskID: string): Promise<taskModel[]>;
}