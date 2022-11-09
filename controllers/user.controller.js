const ErrorCustom = require("../middlewares/errorCustom");
const UserService = require("../services/user.service");

class UserController {
  userService = new UserService();

  createUser = async (req, res, next) => {
    try {
      const userId = await this.userService.createUser();

      res.status(201).json({ userId: userId.userId });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = UserController;
