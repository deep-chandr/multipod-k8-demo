var express = require("express");
var router = express.Router();

const taskList = [{ title: "First task" }];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express tasks app" });
});

router.get("/tasks/", function (req, res, next) {
  res.json({ taskList });
});

router.post("/tasks/", function (req, res, next) {
  const data = req.body;
  const newTask = {
    title: `${taskList.length + 1}: ${data.title || "Task created"}`,
  };
  taskList.push(newTask);
  res.json({ title: newTask });
});

module.exports = router;
