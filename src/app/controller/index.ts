/**
 * Wraps Controllers for easy import from other modules
 */
import UserController from "./UserController";
import HealthController from "./HealthController";
import UserServiceImpl from "../service/UserServiceImpl";
import UserDaoImpl from "../repository/UserDaoImpl";

const userDao = new UserDaoImpl();
const userService = new UserServiceImpl(userDao);

export default [
  new UserController(userService),
  new HealthController()
];
