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

  endRaid = async (userId, raidRecordId) => {
    const findOneRaid = await this.bossRaidRepository.findOneRaid(
      userId,
      raidRecordId
    );

    if (findOneRaid === null) {
      return { msg: "종료할 레이드가 없습니다." };
    }

    if (findOneRaid.status === "end") {
      return { msg: "이미 종료된 레이드 입니다." };
    }

    if (new Date(findOneRaid.endTime) < new Date()) {
      await this.bossRaidRepository.updateRaid(userId, raidRecordId);

      return { msg: "제한시간 초과로 레이드에 실패했습니다." };
    }

    let score = 0;
    if (findOneRaid.level === 0) {
      score = 20;
    } else if (findOneRaid.level === 1) {
      score = 47;
    } else if (findOneRaid.level === 2) {
      score = 85;
    }

    await this.bossRaidRepository.updateRaid(userId, raidRecordId, score);

    return { msg: `레이드에 성공했습니다. 점수 : ${score}` };
  };

  userRank = async () => {
    const allUserRank = await this.bossRaidRepository.findAllUser();

    if (!allUserRank[0]) {
      return { msg: "랭킹 기록이 없습니다." };
    }

    allUserRank.sort((a, b) => {
      return b.dataValues.totalScore - a.dataValues.totalScore;
    });

    let userRankList = [];
    for (let i = 0; i < allUserRank.length; i++) {
      const userRankInfo = {
        ranking: i,
        userId: allUserRank[i].userId,
        totalScore: Number(allUserRank[i].dataValues.totalScore),
      };
      userRankList.push(userRankInfo);
    }

    return userRankList;
  };

  myRank = async (userId, userRank) => {
    const findOneUser = await this.bossRaidRepository.findOneUser(userId);

    if (!findOneUser) {
      return { msg: "존재하지 않는 유저입니다." };
    }

    const findOneUserHistory = await this.bossRaidRepository.findOneUserHistory(
      userId
    );

    if (!findOneUserHistory) {
      return { msg: "유저의 기록이 없습니다." };
    }

    let myRank;
    userRank.map((e) => {
      if (userId === e.userId) {
        myRank = e;
      }
    });

    return myRank;
  };
}

module.exports = BossRaidService;
