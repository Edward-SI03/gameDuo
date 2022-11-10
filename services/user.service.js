const UserRepository = require("../repositories/user.repository");

class UserService {
  userRepository = new UserRepository();

  createUser = async () => {
    const userId = await this.userRepository.createUser();

    return { userId: userId.userId };
  };

  userInfo = async (userId) => {
    const isUser = await this.userRepository.findOneUser(userId);

    if (!isUser) {
      return { msg: "존재하지 않는 유저입니다." };
    }

    let myTotal = await this.userRepository.myTotal(userId);

    if (!myTotal[0]) {
      return { msg: "유저의 기록이 없습니다." };
    } else {
      myTotal = Number(myTotal[0].dataValues.totalScore);
    }

    const myHistory = await this.userRepository.myHistory(userId);

    return {
      totalScore: myTotal,
      bossRaidHistory: myHistory.map((e) => {
        return {
          raidRecordId: e.raidRecordId,
          score: e.score,
          enterTime: e.enterTime,
          endTime: e.endTime,
        };
      }),
    };
  };
}

module.exports = UserService;
