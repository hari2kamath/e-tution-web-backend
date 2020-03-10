
import { expect } from "chai";
import { UserDao } from "../../../app/repository/UserDao";
import UserDaoImpl from "../../../app/repository/UserDaoImpl";
import { createConnection, Connection } from "typeorm";
import rdbmsConfig from "../../../app/config/rdbms";
import { clearDb } from "../util/clearDb";

describe("UserDaoTest", () => {
    let userDao: UserDao;
    let connection: Connection;

    const sampleUser = {
        name: "test name1",
        address: "test address1"
    };

    before("initialise", async () => {
        userDao = new UserDaoImpl();
        connection = await createConnection(rdbmsConfig);
        await clearDb(connection, "user");
    });
    after("delete data", async () => {
        await clearDb(connection, "user");
    });
    describe("createUser", () => {
        it("successfully create a user", async () => {
            const resp = await userDao.createUser(sampleUser);
            expect(resp.name).to.equal(sampleUser.name);
            expect(resp.address).to.equal(sampleUser.address);
        });
    });

    describe("getUser", () => {
        it("should get user by id", async () => {
            const resp1 = await userDao.createUser(sampleUser);
            const resp2 = await userDao.getUserById(resp1.id);
            expect(resp2.name).to.equal(sampleUser.name);
            expect(resp2.address).to.equal(sampleUser.address);
        });
        it("should get user by id", async () => {
            try {
                await userDao.getUserById("6ecb8179-2bd3-4873-8a7d-a974e86be80b");
            } catch (error) {
                expect(error.status).to.equal(404);
                expect(error.message).to.equal("User with given id not found: 6ecb8179-2bd3-4873-8a7d-a974e86be80b");
            }
        });
    });
});
