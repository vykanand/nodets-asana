"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const asanaController_1 = require("./controllers/asanaController");
const router = (0, express_1.Router)();
exports.router = router;
const asanaCtrl = new asanaController_1.asanaController();
router.get('/projects/:workspaceID', (request, response) => {
    return asanaCtrl.getProjects(request, response);
});
router.get('/tasks/:projectID', (request, response) => {
    return asanaCtrl.getTasks(request, response);
});
router.patch('/completetask', (request, response) => {
    return asanaCtrl.completeTask(request, response);
});
