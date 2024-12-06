const express = require("express");
const {
  agregarAlCarrito,
  obtenerCarrito,
  eliminarProductoDelCarrito,
  vaciarCarrito,
} = require("../controllers/carritoController");

const router = express.Router();

router.post("/agregar", agregarAlCarrito);
router.get("/:cliente_id", obtenerCarrito);
router.delete("/:cliente_id/producto/:producto_id", eliminarProductoDelCarrito);
router.delete("/:cliente_id/vaciar", vaciarCarrito);

module.exports = router;
