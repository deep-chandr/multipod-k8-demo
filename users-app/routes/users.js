var express = require("express");
var router = express.Router();
var axios = require("axios");

const AUTH_HOST = process.env.auth_host_url;
const AUTH_HOST_URL = `http://${AUTH_HOST}`;

const myUsers = [{ username: "test", password: "test" }];

router.get("/", async function (req, res, next) {
  try {
    const response = await axios.get(`${AUTH_HOST_URL}/auth/`);
    return res.json(response.data);
  } catch (err) {
    console.log("err: ", err);
    next(err);
  }
});

router.post("/", async function (req, res, next) {
  const { username, password } = req.body;
  myUsers.push({ username, password });

  try {
    const response = axios.post(`${AUTH_HOST_URL}/auth/`, {
      username,
      password,
    });
    return res.json(response.data);
  } catch (err) {
    console.log("err: ", err);
    next(err);
  }
});

module.exports = router;
