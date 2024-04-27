var express = require("express");
var router = express.Router();

const myUsers = [{ username: "test", password: "test" }];

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({ users: myUsers });
});

router.post("/", function (req, res, next) {
  // Save locally
  // than save it in auth service
  const { username, password } = req.body;
  myUsers.push({ username, password });
  res.json({ username, password });
});

module.exports = router;
