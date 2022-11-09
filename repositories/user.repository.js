const { User } = require("../models");

class UserRepository {
  createUser = async () => {
    const userId = await User.create({});

    return userId;
  };
}
module.exports = UserRepository;
