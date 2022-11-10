const express = require("express");
const router = express.Router();

const BossRaidController = require("../controllers/bossRaid.controller");
const bossRaidController = new BossRaidController();

// 보스레이드 상태 조회
router.get("/", bossRaidController.statusRaid);

// 보스레이드 시작
router.post("/enter", bossRaidController.enterRaid);

// 보스레이드 종료
router.patch("/end", bossRaidController.endRaid);

// 보스레이드 랭킹 조회
router.get("/topRankerList", bossRaidController.rankRaid);

module.exports = router;
