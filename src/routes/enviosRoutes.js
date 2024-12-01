const express = require("express");
const {
    agregarEnvio,
    obtenerEnvios,
    obtenerEnvio,
    actualizarEnvio,
    eliminarEnvio,
} = require("../controllers/enviosController");

const router = express.Router();

router.post("/agregarEnvio", agregarEnvio); 
router.get("/", obtenerEnvios); 
router.get("/:id", obtenerEnvio); 
router.put("/actualizar/:id", actualizarEnvio); 
router.delete("/eliminar/:id", eliminarEnvio);

module.exports = router;
