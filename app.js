require("dotenv").config();
const express = require("express");
const Router = require("./routes/index");
const app = express();
const port = process.env.port;

const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
app.use("/", Router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
