import { Router } from 'express';
import { asanaContoller } from './controllers/asanaController';

const router = Router();
const asanaCtrl = new asanaContoller();

router.post('/workspaces', (request, response) => {
    return asanaCtrl.getWorkspace(request, response);
});

router.post('/tasks', (request, response) => {
    return asanaCtrl.getTasks(request, response);
});

router.post('/modifytask', (request, response) => {
    return asanaCtrl.modifyTasks(request, response);
});

export { router };