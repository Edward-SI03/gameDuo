const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.port;

app.use(express.json());
const Router = require("./routes/index");
app.use("/", Router);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
