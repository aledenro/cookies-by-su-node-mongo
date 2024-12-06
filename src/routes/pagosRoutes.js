const express = require("express");
const {
    agregarPago,
    obtenerPagos,
    obtenerPago,
    actualizarPago,
    eliminarPago,
} = require("../controllers/pagosController");

const router = express.Router();

router.post("/agregarPago", agregarPago);
router.post("/procesar-pago", agregarPago);
router.get("/", obtenerPagos);
router.get("/:id", obtenerPago);
router.put("/actualizar/:id", actualizarPago);
router.delete("/eliminar/:id", eliminarPago);


module.exports = router;
