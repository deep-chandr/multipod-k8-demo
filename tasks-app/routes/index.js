var express = require("express");
var router = express.Router();
var axios = require("axios");

const AUTH_HOST = process.env.auth_host_url;
const AUTH_HOST_URL = `http://${AUTH_HOST}`;

const taskList = {
  test: [{ title: "First task" }],
};

const findUser = async (token, res, next) => {
  try {
    const response = await axios.get(
      `${AUTH_HOST_URL}/auth/verify/?token=${token}`
    );
    const userData = response.data;

    if (!userData.user.username) {
      throw Error("Invalid user");
    }
    return userData.user;
  } catch (err) {
    console.log("err: ", err);
    next(err);
  }
};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express tasks app" });
});

router.get("/tasks/", async function (req, res, next) {
  const { token } = req.headers;
  const userData = await findUser(token, res, next);
  res.json({ taskList: taskList[userData.username] || [] });
});

router.post("/tasks/", async function (req, res, next) {
  const { token } = req.headers;
  const data = req.body;
  const userData = await findUser(token, res, next);
  if (!taskList[userData.username]) {
    taskList[userData.username] = [];
  }
  const myTask = taskList[userData.username];
  const newTask = {
    title: `${myTask.length + 1}: ${data.title || "Task created"} : ${token}`,
  };
  myTask.push(newTask);

  res.json({ title: newTask });
});

module.exports = router;
