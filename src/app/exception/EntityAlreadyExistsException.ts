import HttpException from "./HttpException";
import { CustomError } from "../util/errorCode";

/**
 * This exception can use used in case an entity is already existing.
 */
class EntityAlreadyExistsException extends HttpException {
  constructor(error: CustomError) {
    super(409, error.MESSAGE, error.CODE);
  }
}

export default EntityAlreadyExistsException;
