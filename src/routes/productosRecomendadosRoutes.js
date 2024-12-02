const express = require("express");
const {
    agregarProductosRecomendados,
    obtenerProductosRecomendados,
    eliminarProductosRecomendados,
} = require("../controllers/productosRecomendadosController");

const router = express.Router();

router.post("/agregar", agregarProductosRecomendados); 
router.get("/", obtenerProductosRecomendados); 
router.delete("/eliminar", eliminarProductosRecomendados);

module.exports = router;
