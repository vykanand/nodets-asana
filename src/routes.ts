import { Router } from 'express';
import { asanaContoller } from './controllers/asanaController';

const router = Router();
const asanaCtrl = new asanaContoller();

router.get('/workspaces', (request, response) => {
    return asanaCtrl.getWorkspace(request, response);
});

router.get('/tasks/:projectID', (request, response) => {
    return asanaCtrl.getTasks(request, response);
});

router.patch('/completetask', (request, response) => {
    return asanaCtrl.completeTask(request, response);
});

export { router };