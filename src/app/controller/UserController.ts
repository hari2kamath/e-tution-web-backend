import { NextFunction, Response } from "express";
import APP_CONSTANTS from "../constants";
import { UserDto } from "../dto/UserDto";
import { UserParamsDto } from "../dto/UserParamsDto";
import validationMiddleware from "../middleware/validationMiddleware";
import { UserService } from "../service/UserService";
import { AbstractController } from "../util/rest/controller";
import RequestWithUser from "../util/rest/request";

/**
 * Implementation of the UserController route.
 *
 * @param userService service implementation providing user related functionality
 */
class UserController extends AbstractController {

    private userService: UserService;

    constructor(userService: UserService) {
        super(`${APP_CONSTANTS.apiPrefix}/users`);
        this.initializeRoutes();
        this.userService = userService;
    }

    protected initializeRoutes = (): void => {
        this.router.post(`${this.path}`, validationMiddleware(UserDto, APP_CONSTANTS.body),
            this.asyncRouteHandler(this.createUser));
        this.router.get(`${this.path}/:id`, validationMiddleware(UserParamsDto, APP_CONSTANTS.params),
            this.asyncRouteHandler(this.getUserById));
    }

    /**
     * Create a user with given data.
     *
     * @returns User record
     */
    private createUser = async (request: RequestWithUser, response: Response, next: NextFunction) => {

        const userData: UserDto = request.body;
        const userDetail = await this.userService.createUser(userData);
        response.send(this.fmt.formatResponse(userDetail, Date.now() - request.startTime, "OK"));

    }

    /**
     * Get user based on given identifier.
     *
     * @returns User record
     */
    private getUserById = async (request: RequestWithUser, response: Response, next: NextFunction) => {

        const userId: string = request.params.id;
        const userDetail = await this.userService.getUserById(userId);
        response.send(this.fmt.formatResponse(userDetail, Date.now() - request.startTime, "OK"));

    }
}

export default UserController;
