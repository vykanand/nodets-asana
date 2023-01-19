import request from "supertest";
import { app } from "../../src/app";
import { projectResponse, taskResponse } from '../test-data/dataResponse';

describe("GET /projects", () => {
    it("should cover negative test case", async () => {
        const ntestRequest = await request(app)
            .get("/projects/451926093273667?caching=allowed")
            .set({ "Authorization": null });
        expect(ntestRequest.statusCode).toBe(400);
    });
    it("should return valid response without caching", async () => {
        const testRequest = await request(app)
            .get("/projects/451926093273667?caching=disallowed")
            .set({ "Authorization": "Bearer 1/451927151844254:57ed86c12a488f168ac3077b8a050c8f" });
        expect(testRequest.body).toEqual(projectResponse);
    });
});


describe("GET /tasks/:projectID", () => {
    it("should cover negative test case", async () => {
        const ntestRequest = await request(app)
            .get("/tasks/1132697072393381?caching=allowed")
            .set({ "Authorization": null });
        expect(ntestRequest.statusCode).toBe(400);
    });
    it("should return valid response without caching", async () => {
        const testRequest2 = await request(app)
            .get("/tasks/1132697072393381?caching=disallowed")
            .set({ "Authorization": "Bearer 1/451927151844254:57ed86c12a488f168ac3077b8a050c8f" });
        expect(testRequest2.body).toEqual(taskResponse);
    });
});


describe("Tests for PATCH /completetask", () => {
    it("should cover negative test case", async () => {
        const ntestRequest = await request(app)
            .patch("/completetask")
            .set({ "Authorization": null })
            .send({ "taskID": "1132697072393384" });
        expect(ntestRequest.statusCode).toBe(400);
    });
    it("should return valid response", async () => {
        const testRequest3 = await request(app)
            .patch("/completetask")
            .set({ "Authorization": "Bearer 1/451927151844254:57ed86c12a488f168ac3077b8a050c8f" })
            .send({ "taskID": "1132697072393384" });
        expect(testRequest3.body.gid).toEqual('1132697072393384');
    });
})