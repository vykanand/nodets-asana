import { ProjectDatabase } from '../entities/asana/projectSchema';
import { TaskDatabase } from '../entities/asana/taskSchema';
import { projects } from '../models/asana/projectsModel';
import { tasksData } from '../models/asana/taskModel';


export async function saveProjectData(responseValue: projects[]): Promise<boolean> {
    const projectData = new ProjectDatabase(responseValue);
    return await projectData.collection.insertMany(responseValue).then((result) => {
        return true;
    }).catch((err) => {
        return false;
    });
}

export async function saveTaskData(responseValue: tasksData[]): Promise<boolean> {
    const taskData = new TaskDatabase(responseValue);
    return await taskData.collection.insertMany(responseValue).then((result) => {
        return true;
    }).catch((err) => {
        return false;
    });
}

export async function fetchProjectData(): Promise<projects[]> {
    const projectData = new ProjectDatabase();
    const localProjectData = await projectData.collection.find({}, { projection: { _id: 0 } }).toArray() as any;
    return localProjectData as projects[];
}

export async function fetchProjectTasks(projectID: string): Promise<tasksData[]> {
    const taskDatabase = new TaskDatabase();
    const localtaskData = await taskDatabase.collection.find({ projectID: projectID }, { projection: { _id: 0 } }).toArray() as any;
    return localtaskData as tasksData[];
}