
import { expect } from "chai";
import { UserService } from "../../../app/service/UserService";
import { Substitute } from "@fluffy-spoon/substitute";
import UserServiceImpl from "../../../app/service/UserServiceImpl";
import { UserDao } from "../../../app/repository/UserDao";

describe("UserServiceTest", () => {
    let userService: UserService;
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
        const userDao = Substitute.for<UserDao>();
        userDao.createUser(sampleUser).returns(Promise.resolve(sampleUserResponse));
        userDao.getUserById("123").returns(Promise.resolve(sampleUserResponse));
        userService = new UserServiceImpl(userDao);
    });
    describe("createUser", () => {
        it("successfully create a user", async () => {
            const resp = await userService.createUser(sampleUser);
            expect(resp.name).to.equal(sampleUserResponse.name);
            expect(resp.address).to.equal(sampleUserResponse.address);
        });
    });

    describe("getUser", () => {
        it("should get user by id", async () => {
            const resp = await userService.getUserById("123");
            expect(resp.name).to.equal(sampleUserResponse.name);
            expect(resp.address).to.equal(sampleUserResponse.address);
        });
    });
});
