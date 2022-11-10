const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");
const userController = new UserController();

// 유저 생성
router.post("/", userController.createUser);

// 유저 조회
router.get("/:userId", userController.userInfo);

module.exports = router;
