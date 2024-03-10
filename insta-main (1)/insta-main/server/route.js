const express = require("express");
const {
  createUser,
  loginUser,
  getUser,
  updateUser,
  createPost,
} = require("./usercontroller");
const router = express.Router();

router.route("/signup").post(createUser);
router.route("/login").post(loginUser);
router.route("/user/:username").get(getUser).patch(updateUser);
router.route("/post").post(createPost);
module.exports = router;
