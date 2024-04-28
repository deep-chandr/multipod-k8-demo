var express = require("express");
var router = express.Router();

const authList = [{ username: "test", password: "test", token: "test" }];

/* GET users listing. */
router.get("/", function (req, res, next) {
  return res.json({ authList });
});

router.get("/verify", function (req, res, next) {
  const { token } = req.query;
  const users = authList.filter((x) => x.token === token);
  return res.json({ user: users[0] || {} });
});

router.post("/", function (req, res, next) {
  const { username, password } = req.body;
  authList.push({ username, password, token: `${username}-token` });
  return res.json({ success: true });
});

module.exports = router;
