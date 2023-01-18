"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchLocalProjectTasks = exports.fetchLocalProjectData = exports.saveTaskData = exports.saveProjectData = void 0;
const projectSchema_1 = require("../../entities/asana/projectSchema");
const taskSchema_1 = require("../../entities/asana/taskSchema");
async function saveProjectData(responseValue) {
    const projectData = new projectSchema_1.ProjectDatabase(responseValue);
    return await projectData.collection.insertMany(responseValue).then((result) => {
        return true;
    }).catch((err) => {
        return false;
    });
}
exports.saveProjectData = saveProjectData;
async function saveTaskData(responseValue) {
    const taskData = new taskSchema_1.TaskDatabase(responseValue);
    return await taskData.collection.insertMany(responseValue).then((result) => {
        return true;
    }).catch((err) => {
        return false;
    });
}
exports.saveTaskData = saveTaskData;
async function fetchLocalProjectData() {
    const projectData = new projectSchema_1.ProjectDatabase();
    const localProjectData = await projectData.collection.find({}, { projection: { _id: 0 } }).toArray();
    return localProjectData;
}
exports.fetchLocalProjectData = fetchLocalProjectData;
async function fetchLocalProjectTasks(projectID) {
    const taskDatabase = new taskSchema_1.TaskDatabase();
    const localtaskData = await taskDatabase.collection.find({ projectID: projectID }, { projection: { _id: 0 } }).toArray();
    return localtaskData;
}
exports.fetchLocalProjectTasks = fetchLocalProjectTasks;
