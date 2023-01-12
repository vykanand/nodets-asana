import { projects } from "./projectsModel";
import { taskModel, tasksData } from "./taskModel";

/**
 * DEMONSTRATION OF OPEN CLOSED PRINCIPLE
*/

export interface serviceInterface {
    /**
     * Define Asana service boundries.
     */
    fetchprojects(patValue: string, workspaceID: string): Promise<projects[]>;

    fetchtasks(patValue: string, projectID: string): Promise<tasksData[]>;

    completeTask(patValue: string, taskID: string): Promise<taskModel[]>;
}