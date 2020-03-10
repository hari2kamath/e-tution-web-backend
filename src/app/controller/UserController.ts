import { NextFunction, Response, Router } from "express";
import Controller from "../util/rest/controller";
import RequestWithUser from "../util/rest/request";
import { Formatter } from "../util/formatter";
import APP_CONSTANTS from "../constants";
import validationMiddleware from "../middleware/validationMiddleware";
import { UserDto } from "../dto/UserDto";
import { UserParamsDto } from "../dto/UserParamsDto";
import { UserService } from "../service/UserService";

/**
 * Implementation of the UserController route.
 *
 * @param userService service implementation providing user related functionality
 */
class UserController implements Controller {
    public path: string = `${APP_CONSTANTS.apiPrefix}/users`;
    public router: Router = Router();
    private fmt: Formatter = new Formatter();
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}`, validationMiddleware(UserDto, APP_CONSTANTS.body), this.createUser);
        this.router.get(
            `${this.path}/:id`, validationMiddleware(UserParamsDto, APP_CONSTANTS.params), this.getUserById);
    }

    /**
     * Create a user with given data.
     *
     * @returns User record
     */
    private createUser = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        try {
            const userData: UserDto = request.body;
            const userDetail = await this.userService.createUser(userData);
            response.send(this.fmt.formatResponse(userDetail, Date.now() - request.startTime, "OK"));
        } catch (error) {
            return next(error);
        }
    }

    /**
     * Get user based on given identifier.
     *
     * @returns User record
     */
    private getUserById = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        try {
            const userId: string = request.params.id;
            const userDetail = await this.userService.getUserById(userId);
            response.send(this.fmt.formatResponse(userDetail, Date.now() - request.startTime, "OK"));
        } catch (error) {
            return next(error);
        }
    }
}

export default UserController;
