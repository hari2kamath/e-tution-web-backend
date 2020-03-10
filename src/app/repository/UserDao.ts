import { UserDto } from "../dto/UserDto";
import { User } from "../entity/User";

export interface UserDao {
    /**
     * Create user with given data.
     */
    createUser(user: UserDto): Promise<User>;
    /**
     * Get user by given id.
     */
    getUserById(userId: string): Promise<User>;
}
