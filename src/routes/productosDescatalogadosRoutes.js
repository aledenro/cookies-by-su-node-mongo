const express = require("express");
const {
    agregarProductoDescatalogado,
    obtenerProductosDescatalogados,
    eliminarProductoDescatalogado,
} = require("../controllers/productosDescatalogadosController");

const router = express.Router();

router.post("/agregar", agregarProductoDescatalogado); 
router.get("/", obtenerProductosDescatalogados); 
router.delete("/eliminar/:producto_id", eliminarProductoDescatalogado);

module.exports = router;
