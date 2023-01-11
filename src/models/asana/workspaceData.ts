//Interfaces help us to define the structure of data we need to use in this project
//It also enforces necassary rules so that we can define our system's boundaries
export interface workspaceData {
    gid: string,
    email?: string,
    name: string,
    resource_type: string,
    workspaces?: workspaces[]
}

export interface workspaces {
    gid: string,
    name: string,
    resource_type: string,
    resource_subtype?: string
};


