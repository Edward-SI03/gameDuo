const express = require("express");
const router = express.Router();

const BossRaidController = require("../controllers/bossRaid.controller");
const bossRaidController = new BossRaidController();

// 보스레이드 상태조회
/* 보스레이드 현재 상태 응답
    - canEnter : 입장 가능한지
    - enteredUserId : 현재 진행중인 유저가 있다면, 해당 유저의 id
입장 가능 조건 : 한번에 한 명의 유저만 보스레이드를 진행할 수 있습니다.
    - 아무도 보스레이드를 시작한 기록이 없다면 시작 가능합니다.
    - 시작한 기록이 있다면 마지막으로 시작한 유저가 보스레이드를 종료했거나, 시작한 시간으로부터 레이드 제한시간만큼 경과되었어야 합니다. */
router.get("/", bossRaidController.statusRaid);

// 보스레이드 시작
/*레이드 시작 가능하다면 중복되지 않는 raidRecordId를 생성하여 isEntered:true와 함께 응답
레이드 시작이 불가하다면 isEntered : false
 */
router.post("/enter", bossRaidController.enterRaid);

// 보스레이드 종료
/*raidRecordId 종료 처리
    - 레이드 level에 따른 score 반영
유효성 검사
    - 저장된 userId와 raidRecoridId 일치하지 않다면 예외 처리
    - 시작한 시간으로부터 레이드 제한시간이 지났다면 예외 처리 */
router.patch("/end", bossRaidController.endRaid);

module.exports = router;
