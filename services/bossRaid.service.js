const BossRaidRepository = require("../repositories/bossRaid.repository");

class BossRaidService {
  bossRaidRepository = new BossRaidRepository();

  status = async () => {
    const isEntered = await this.bossRaidRepository.isEntered();

    if (
      isEntered.status === "end" ||
      new Date(isEntered.endTime) < new Date()
    ) {
      return { canEnter: true };
    } else {
      return { canEnter: false, enteredUserId: isEntered.raidRecordId };
    }
  };

  enterRaid = async (userId, level) => {
    const isEntered = await this.bossRaidRepository.isEntered();

    if (
      isEntered.status === "end" ||
      new Date(isEntered.endTime) < new Date()
    ) {
      const nowTime = new Date();
      const endTime = nowTime.setSeconds(nowTime.getSeconds() + 180);

      const enterRaid = await this.bossRaidRepository.createRaid(
        userId,
        level,
        endTime
      );

      return { isEntered: true, raidRecordId: enterRaid.raidRecordId };
    } else {
      return { isEntered: false };
    }
  };
}

module.exports = BossRaidService;
