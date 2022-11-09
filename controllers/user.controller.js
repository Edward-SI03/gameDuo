const ErrorCustom = require("../middlewares/errorCustom");
const UserService = require("../services/user.service");

const regExp = /[0-9]/;

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
      const validate = regExp.test(req.params.userId);

      if (!validate) {
        throw new ErrorCustom(400, "형식이 맞지 않습니다.");
      }

      const { userId } = req.params;

      const userInfo = await this.userService.userInfo(userId);

      res.status(200).json(userInfo);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = UserController;
