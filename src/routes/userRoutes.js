const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/users", userController.getUsers);
router.get("/users/id/:id", userController.getUserById);
router.get("/users/email/:email", userController.getUserByCorreo);

module.exports = router;
