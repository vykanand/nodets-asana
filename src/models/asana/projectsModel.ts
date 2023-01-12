import { tasksData } from "./taskModel"
//Interfaces help us to define the structure of data we need to use in this project
//It also enforces necassary rules so that we can define our system's boundaries
export interface projectData {
    gid: string,
    email?: string,
    name: string,
    resource_type: string,
    workspaces?: tasksData[]
};

export interface projects {
    gid: string,
    name: string,
    resource_type: string
};




