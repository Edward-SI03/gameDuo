const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");
const userController = new UserController();

// 유저 생성
// 중복되지 않는 userId를 생성
// 생성된 userId를 응답
router.post("/", userController.createUser);

// 유저 조회
// 해당 유저의 보스레이드 총 점수와 참여기록 응답
router.get("/:userId", (req, res) => {});

module.exports = router;
