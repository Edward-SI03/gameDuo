const express = require("express");
const router = express.Router();

const BossRaidController = require("../controllers/bossRaid.controller");
const bossRaidController = new BossRaidController();

// 보스레이드 시작
/*레이드 시작 가능하다면 중복되지 않는 raidRecordId를 생성하여 isEntered:true와 함께 응답
레이드 시작이 불가하다면 isEntered : false
 */
router.post("/enter", bossRaidController.enterRaid);

module.exports = router;
