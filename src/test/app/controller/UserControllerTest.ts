
import { TestServer } from "../testServer";
import { expect } from "chai";
import { UserService } from "../../../app/service/UserService";
import UserController from "../../../app/controller/UserController";
import { Substitute } from "@fluffy-spoon/substitute";

describe("UserControllerTest", () => {
    let server: TestServer;
    const sampleUser = {
        name: "test name1",
        address: "test address1"
    };
    const sampleUserResponse = {
        id: "123",
        name: "test name1",
        address: "test address1"
    };
    before("initialise", () => {
        const userService = Substitute.for<UserService>();
        userService.createUser(sampleUser).returns(Promise.resolve(sampleUserResponse));
        userService.getUserById("6ecb8179-2bd3-4873-8a7d-a974e86be80b").returns(Promise.resolve(sampleUserResponse));
        server = TestServer.getInstance(new UserController(userService));
    });
    describe("createUser", () => {
        it("successfully create a user", async () => {
            const jsonData = JSON.parse(JSON.stringify(sampleUser));
            const resp = await server.post("/v1/users", jsonData);
            expect(resp.status).to.equal(200);
        });
        it("should throw validation error name is mandatory", async () => {
            const invalidUser = {
                address: "test address1"
            };
            const jsonData = JSON.parse(JSON.stringify(invalidUser));
            const response = await server.post("/v1/users", jsonData);
            expect(response.status).to.equal(400);
        });
    });

    describe("getUser", () => {
        it("should get user by id", async () => {
            const resp = await server.get("/v1/users/6ecb8179-2bd3-4873-8a7d-a974e86be80b");
            expect(resp.status).to.equal(200);
        });
        it("should throw validation error id must be a valid uui", async () => {
            const response = await server.get("/v1/users/123");
            expect(response.status).to.equal(400);
        });
    });
});
