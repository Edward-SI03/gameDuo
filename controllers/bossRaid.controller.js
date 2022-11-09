const ErrorCustom = require("../middlewares/errorCustom");
const BossRaidService = require("../services/bossRaid.service");

class BossRaidController {
  bossRaidService = new BossRaidService();

  statusRaid = async (req, res, next) => {
    try {
      const status = await this.bossRaidService.status();

      res.status(200).json(status);
    } catch (err) {
      next(err);
    }
  };

  enterRaid = async (req, res, next) => {
    try {
      const { userId, level } = req.body;

      const enterRaid = await this.bossRaidService.enterRaid(userId, level);

      res.status(201).json(enterRaid);
    } catch (err) {
      next(err);
    }
  };

  endRaid = async (req, res, next) => {
    try {
      const { userId, raidRecordId } = req.body;

      const endRaid = await this.bossRaidService.endRaid(userId, raidRecordId);

      res.status(200).json(endRaid);
    } catch (err) {
      next(err);
    }
  };

  rank = async (req, res, next) => {
    try {
      const { userId } = req.body;

      const userRank = await this.bossRaidService.userRank();
      const myRank = await this.bossRaidService.myRank(userId, userRank);

      res
        .status(200)
        .json({ topRankerInfoList: userRank, myRankingInfo: myRank });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = BossRaidController;
