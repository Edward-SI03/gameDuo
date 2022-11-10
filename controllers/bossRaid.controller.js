const ErrorCustom = require("../middlewares/errorCustom");
const BossRaidService = require("../services/bossRaid.service");

const regExp = /[0-9]/;

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
      const validateUserId = regExp.test(req.body.userId);
      const validateLevel = regExp.test(req.body.level);

      if (!validateUserId || !validateLevel) {
        throw new ErrorCustom(400, "형식이 맞지 않습니다.");
      }

      const { userId, level } = req.body;

      const enterRaid = await this.bossRaidService.enterRaid(userId, level);

      res.status(201).json(enterRaid);
    } catch (err) {
      next(err);
    }
  };

  endRaid = async (req, res, next) => {
    try {
      const validateUserId = regExp.test(req.body.userId);
      const validateRaidRecordId = regExp.test(req.body.raidRecordId);

      if (!validateUserId || !validateRaidRecordId) {
        throw new ErrorCustom(400, "형식이 맞지 않습니다.");
      }

      const { userId, raidRecordId } = req.body;

      const endRaid = await this.bossRaidService.endRaid(userId, raidRecordId);

      res.status(200).json(endRaid);
    } catch (err) {
      next(err);
    }
  };

  rankRaid = async (req, res, next) => {
    try {
      const validateUserId = regExp.test(req.params.userId);

      if (!validateUserId) {
        throw new ErrorCustom(400, "형식이 맞지 않습니다.");
      }

      const { userId } = req.params;

      const userRank = await this.bossRaidService.userRank();
      const myRank = await this.bossRaidService.myRank(
        Number(userId),
        userRank
      );

      res
        .status(200)
        .json({ topRankerInfoList: userRank, myRankingInfo: myRank });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = BossRaidController;
