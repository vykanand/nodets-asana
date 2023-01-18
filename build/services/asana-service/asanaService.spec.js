"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
const projectResponse_1 = require("./test-data/projectResponse");
describe("GET /projects", () => {
    it("should cover negative test case", async () => {
        const ntestRequest = await (0, supertest_1.default)(app_1.app)
            .get("/projects/451926093273667?caching=allowed")
            .set({ "Authorization": null });
        expect(ntestRequest.statusCode).toBe(400);
    });
    it("should return valid response without caching", async () => {
        const testRequest = await (0, supertest_1.default)(app_1.app)
            .get("/projects/451926093273667?caching=disallowed")
            .set({ "Authorization": "Bearer 1/451927151844254:57ed86c12a488f168ac3077b8a050c8f" });
        expect(testRequest.body).toEqual(projectResponse_1.projectResponse);
    });
});
describe("GET /tasks/:projectID", () => {
    it("should cover negative test case", async () => {
        const ntestRequest = await (0, supertest_1.default)(app_1.app)
            .get("/tasks/1132697072393381?caching=allowed")
            .set({ "Authorization": null });
        expect(ntestRequest.statusCode).toBe(400);
    });
    it("should return valid response without caching", async () => {
        const testRequest2 = await (0, supertest_1.default)(app_1.app)
            .get("/tasks/1132697072393381?caching=disallowed")
            .set({ "Authorization": "Bearer 1/451927151844254:57ed86c12a488f168ac3077b8a050c8f" });
        expect(testRequest2.body).toEqual(projectResponse_1.taskResponse);
    });
});
describe("Tests for PATCH /completetask", () => {
    it("should cover negative test case", async () => {
        const ntestRequest = await (0, supertest_1.default)(app_1.app)
            .patch("/completetask")
            .set({ "Authorization": null })
            .send({ "taskID": "1132697072393384" });
        expect(ntestRequest.statusCode).toBe(400);
    });
    it("should return valid response", async () => {
        const testRequest3 = await (0, supertest_1.default)(app_1.app)
            .patch("/completetask")
            .set({ "Authorization": "Bearer 1/451927151844254:57ed86c12a488f168ac3077b8a050c8f" })
            .send({ "taskID": "1132697072393384" });
        expect(testRequest3.body.gid).toEqual('1132697072393384');
    });
});
