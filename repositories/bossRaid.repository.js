const { bossRaid } = require("../models");
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
}

module.exports = BossRaidRepository;
