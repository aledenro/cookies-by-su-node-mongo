const express = require("express");
const { register, login, verifyToken, logout } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify", verifyToken);
router.post("/logout", logout);

module.exports = router;
