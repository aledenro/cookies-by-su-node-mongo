const express = require("express");
const {
    agregarProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto,
} = require("../controllers/productosController");

const router = express.Router();

router.post("/agregarProducto", agregarProducto);
router.get("/", obtenerProductos);
router.get("/:id", obtenerProducto);
router.put("/actualizar/:id", actualizarProducto);
router.delete("/eliminar/:id", eliminarProducto);

module.exports = router;
