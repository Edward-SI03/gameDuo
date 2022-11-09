const { User, bossRaid, sequelize } = require("../models");

class UserRepository {
  createUser = async () => {
    const userId = await User.create({});

    return userId;
  };

  mytotal = async (userId) => {
    const mytotal = await bossRaid.findAll({
      attributes: [[sequelize.fn("sum", sequelize.col("score")), "totalScore"]],
      where: { userId },
      group: "userId",
    });

    return Number(mytotal[0].dataValues.totalScore);
  };

  myHistory = async (userId) => {
    const myHistory = await bossRaid.findAll({ where: { userId } });

    return myHistory;
  };
}
module.exports = UserRepository;
