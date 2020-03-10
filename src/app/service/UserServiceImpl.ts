import { UserService } from "./UserService";
import { UserDto } from "../dto/UserDto";
import { UserDao } from "../repository/UserDao";
import { User } from "../entity/User";

class UserServiceImpl implements UserService {

    private userDao: UserDao;

    constructor(userDao: UserDao) {
        this.userDao = userDao;
    }

    /**
     * Create user with given data.
     *
     * @param userData User data
     * @returns User record created
     */
    public createUser = async (userData: UserDto): Promise<User> => {
        // TODO Add all business logic and validations needed here.
        const userDetail: User = await this.userDao.createUser(userData);
        return userDetail;
    }

    /**
     * Get the user based on the given id.
     *
     * @param userId User identifier
     * @returns User record
     */
    public getUserById = async (userId: string):
        Promise<User> => {
        // TODO Add all business logic and validations needed here.
        const userDetail: User = await this.userDao.getUserById(userId);
        return userDetail;
    }
}

export default UserServiceImpl;
