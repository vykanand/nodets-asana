import { workspaces } from "./workspaceData"
export interface taskModel {
    gid: string,
    projects: projectsModel[],
    resource_type: string,
    created_at: string,
    modified_at: string,
    name: string,
    notes: string,
    assignee?: string,
    completed: boolean,
    assignee_status: string,
    completed_at: string,
    due_on: string,
    due_at: string,
    resource_subtype: string,
    start_on: string,
    start_at: string,
    tags?: [],
    workspace?: workspaces[],
    num_hearts: number,
    num_likes: number,
    permalink_url: string,
    parent: string,
    hearted: boolean,
    hearts?: [],
    liked: boolean,
    likes?: [],
    memberships?: [],
    followers?: followersModel[]
}

export interface projectsModel {
    gid: string,
    resource_type: string,
    name: string
}

export interface followersModel {
    gid: string,
    resource_type: string,
    name: string
}

