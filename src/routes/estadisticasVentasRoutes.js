const express = require("express");
const {
    registrarVenta,
    obtenerEstadisticasPorProducto,
} = require("../controllers/estadisticasVentasController");

const router = express.Router();

router.post("/registrar", registrarVenta); 
router.get("/:producto_id", obtenerEstadisticasPorProducto); 

module.exports = router;
