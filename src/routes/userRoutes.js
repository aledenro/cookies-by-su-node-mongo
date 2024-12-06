const express = require("express");
const userController = require("../controllers/userController");
const { auth, checkRole } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/users", auth, checkRole("Admin"), userController.getUsers);
router.get("/users/id/:id", auth, checkRole("Admin"), userController.getUserById); 
router.get("/users/email/:email", auth, checkRole("Admin"), userController.getUserByCorreo);

router.put("/users/updateBasicInfo/:id", auth, checkRole("Admin"), userController.updateUserBasicInfo);
router.put("/users/updatePassword/:id", auth, userController.updateUserPassword); 
router.put("/users/updateRoles/:id", auth, checkRole("Admin"), userController.updateUserRoles);
router.post("/users/createUser", auth, checkRole("Admin"), userController.createUser);
router.put("/users/changeEstado/:id", auth, checkRole("Admin"), userController.cambiarEstadoUser);

module.exports = router;
