const UserService = require("../services/user.service");

class UserController {
  userService = new UserService();

  createUser = async (req, res) => {
    try {
      const userId = await this.userService.createUser();

      res.status(201).json({ userId: userId.userId });
    } catch {}
  };
}

module.exports = UserController;
