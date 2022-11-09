const UserRepository = require("../repositories/user.repository");

class UserService {
  userRepository = new UserRepository();

  createUser = async () => {
    const userId = await this.userRepository.createUser();

    return userId;
  };
}

module.exports = UserService;
