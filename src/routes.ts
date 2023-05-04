import { Router } from 'express';
import { AsanaController } from './controllers/asanaController';

const router = Router();
const asanaCtrl = new AsanaController();

router.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });

router.get('/projects/:workspaceID', (request, response) => {
    return asanaCtrl.getProjects(request, response);
});

router.get('/tasks/:projectID', (request, response) => {
    return asanaCtrl.getTasks(request, response);
});

router.patch('/completetask', (request, response) => {
    return asanaCtrl.completeTask(request, response);
});

export { router };