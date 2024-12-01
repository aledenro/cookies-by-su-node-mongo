const express = require("express");
const {
    agregarDescuento,
    obtenerDescuentos,
    actualizarDescuento,
    eliminarDescuento,
    obtenerDescuento,
} = require("../controllers/descuentosController");

const router = express.Router();

router.post("/agregarDescuento", agregarDescuento); 
router.get("/", obtenerDescuentos);
router.get("/:id", obtenerDescuento);
router.put("/actualizar/:id", actualizarDescuento); 
router.delete("/eliminar/:id", eliminarDescuento);

module.exports = router;