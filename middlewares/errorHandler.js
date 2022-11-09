const ErrorCustom = require("./errorCustom");

module.exports = (err, req, res, next) => {
  console.log(err);
  if (err instanceof ErrorCustom) {
    return res.status(err.code).json({ errMsg: err.message });
  }

  return res.status(500).json({ errMsg: err.message });
};
