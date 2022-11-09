const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const bossRaidRouter = require("./bossRaid");

router.use("/user", userRouter);
router.use("/bossRaid", bossRaidRouter);

module.exports = router;
