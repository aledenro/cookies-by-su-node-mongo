const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/users", userController.getUsers);
router.get("/users/id/:id", userController.getUserById);
router.get("/users/email/:email", userController.getUserByCorreo);
router.put("/users/updateBasicInfo/:id", userController.updateUserBasicInfo);
router.put("/users/updatePassword/:id", userController.updateUserPassword);
router.put("/users/updateRoles/:id", userController.updateUserRoles);
router.post("/users/createUser", userController.createUser);
router.put("/users/changeEstado/:id", userController.cambiarEstadoUser);

module.exports = router;
