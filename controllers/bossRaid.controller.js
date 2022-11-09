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
}

module.exports = BossRaidController;
