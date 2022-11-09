const ErrorCustom = require("../middlewares/errorCustom");
const UserService = require("../services/user.service");

class UserController {
  userService = new UserService();

  createUser = async (req, res, next) => {
    try {
      const userId = await this.userService.createUser();

      res.status(201).json(userId);
    } catch (err) {
      next(err);
    }
  };

  userInfo = async (req, res, next) => {
    try {
      const { userId } = req.params;

      const userInfo = await this.userService.userInfo(userId);

      res.status(200).json(userInfo);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = UserController;
