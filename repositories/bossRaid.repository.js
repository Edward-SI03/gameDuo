const { bossRaid, User, sequelize } = require("../models");
const { Op } = require("sequelize");

class BossRaidRepository {
  isEntered = async () => {
    const isEntered = await bossRaid.findOne({
      order: [["raidRecordId", "DESC"]],
    });

    return isEntered;
  };

  createRaid = async (userId, level, endTime) => {
    const createRaid = await bossRaid.create({
      level,
      score: 0,
      status: "start",
      enterTime: new Date(),
      endTime,
      userId,
    });

    return createRaid;
  };

  findOneRaid = async (userId, raidRecordId) => {
    const findOneRaid = await bossRaid.findOne({
      where: { userId, raidRecordId },
    });

    return findOneRaid;
  };

  updateRaid = async (userId, raidRecordId, score) => {
    await bossRaid.update(
      { status: "end", score },
      { where: { userId, raidRecordId } }
    );
  };

  findAllUser = async () => {
    const findAllUser = await bossRaid.findAll({
      attributes: [
        "userId",
        "score",
        [sequelize.fn("sum", sequelize.col("score")), "totalScore"],
      ],
      where: { score: { [Op.gt]: 0 } },
      group: "userId",
      order: [["userId", "ASC"]],
    });

    return findAllUser;
  };

  findOneUser = async (userId) => {
    const findOneUser = await User.findOne({ where: { userId } });

    return findOneUser;
  };

  findOneUserHistory = async (userId) => {
    const findOneUserHistory = await bossRaid.findOne({ where: { userId } });

    return findOneUserHistory;
  };
}

module.exports = BossRaidRepository;
