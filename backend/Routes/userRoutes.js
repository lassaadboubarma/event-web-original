const express = require("express");
const { signup, login } = require("../Controllers/UserController");
const router = express.Router();

// Routes for signup and login
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
