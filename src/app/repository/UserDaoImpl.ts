import { getManager, Repository } from "typeorm";
import { UserDto } from "../dto/UserDto";
import { User } from "../entity/User";
import { UserDao } from "./UserDao";
import UserNotFoundException from "../exception/UserNotFoundException";
import logger from "../config/logger";

/**
 * Handles CRUD operations on User data in database
 * Factoring to this class allows other (i.e. GraphQL to reuse this code in resolvers)
 */
class UserDaoImpl implements UserDao {

  /**
   * Create a user with given data.
   *
   * @param userData User data
   * @returns Created user record
   */
  public createUser = async (userData: UserDto): Promise<User> => {
    const userRepo: Repository<User> = getManager().getRepository(User);
    const userDetail: User = await userRepo.save(userData);
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
    const userRepo: Repository<User> = getManager().getRepository(User);
    const userDetail = await userRepo.findOne(userId);

    if (!userDetail) {
      logger.error(`Error while getUserById: ${userId}`);
      throw new UserNotFoundException(userId);
    }
    return userDetail;
  }

}

export default UserDaoImpl;
