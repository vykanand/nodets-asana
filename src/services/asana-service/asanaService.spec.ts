import { taskResponse } from "./test-data/dataResponse";
import { asanaService } from "./asanaService";
import { fetchLocalProjectData, fetchLocalProjectTasks } from '../asana-local-db/asanaLocalDbService';

jest.mock('../asana-local-db/asanaLocalDbService');
jest.mock('../../utils/axisoUtils', () => {
    return {
        getTasksService: () => taskResponse,
    };
});

const service = new asanaService();
let authToken: string;
let workspaceID: string = '451926093273667';
let taskID: string = '1132697072393384';

beforeEach(() => {
    jest.restoreAllMocks();
    authToken = '1/451927151844254:57ed86c12a488f168ac3077b8a050c8f';
});

describe("Unit test cases for fetchprojects()", () => {
    it("Test with local caching enabled", async () => {
        const createClient = jest.spyOn(service, 'createClient');
        const fetchService = await service.fetchprojects(authToken, workspaceID, 'disallowed');
        expect(createClient).toBeCalled();
        expect(createClient).toBeCalledTimes(1);
        expect(fetchService).toBeTruthy();
    });
    it("Test with local caching disabled", async () => {
        const fetchService = await service.fetchprojects(authToken, workspaceID, 'allowed');
        expect(fetchLocalProjectData).toBeCalled();
        expect(fetchLocalProjectData).toBeCalledTimes(1);
        expect(fetchService).toBeFalsy();
    });
});

describe("Unit test cases for fetchtasks()", () => {
    it("Test with local caching disabled", async () => {
        const fetchTasks = await service.fetchtasks(authToken, taskID, 'disallowed');
        expect(fetchTasks).toBeTruthy();
        fetchTasks.forEach(element => {
            expect(element).toHaveProperty('gid');
            expect(element).toHaveProperty('name');
            expect(element).toHaveProperty('resource_type');
            expect(element).toHaveProperty('resource_subtype');
        });
    });
    it("Test with local caching enabled", async () => {
        const fetchTasks = await service.fetchtasks(authToken, taskID, 'allowed');
        expect(fetchLocalProjectTasks).toBeCalled();
        expect(fetchTasks).toBeFalsy();
    });
});

describe("Unit test cases for completeTask()", () => {
    it("Test with local caching enabled", async () => {
        const createClient = jest.spyOn(service, 'createClient');
        await service.completeTask(authToken, taskID);
        expect(createClient).toBeCalled();
    });
});
