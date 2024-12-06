const express = require("express");
const {
    registrarVenta,
    obtenerEstadisticasPorProducto,
    obtenerEstadisticasGenerales,
} = require("../controllers/estadisticasVentasController");

const router = express.Router();

router.post("/registrar", registrarVenta); 
router.get("/generales", obtenerEstadisticasGenerales);
router.get("/:producto_id", obtenerEstadisticasPorProducto);

module.exports = router;
