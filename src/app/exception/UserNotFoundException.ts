import HttpException from "./HttpException";

class UserNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `User with given id not found: ${id}`);
  }
}

export default UserNotFoundException;
