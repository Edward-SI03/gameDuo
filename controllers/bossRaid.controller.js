const ErrorCustom = require("../middlewares/errorCustom");
const BossRaidService = require("../services/bossRaid.service");

class BossRaidController {
  bossRaidService = new BossRaidService();

  enterRaid = async (req, res, next) => {
    try {
      const { userId, level } = req.body;

      const enterRaid = await this.bossRaidService.enterRaid(userId, level);

      res.status(201).json({ enterRaid });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = BossRaidController;
