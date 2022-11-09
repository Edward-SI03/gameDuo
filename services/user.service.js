const UserRepository = require("../repositories/user.repository");

class UserService {
  userRepository = new UserRepository();

  createUser = async () => {
    const userId = await this.userRepository.createUser();

    return { userId: userId.userId };
  };

  userInfo = async (userId) => {
    const mytotal = await this.userRepository.mytotal(userId);
    const myHistory = await this.userRepository.myHistory(userId);

    return {
      totalScore: mytotal,
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
