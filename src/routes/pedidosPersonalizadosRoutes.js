const express = require("express");
const {
    agregarPedidoPersonalizado,
    obtenerPedidosPersonalizados,
    obtenerPedidoPersonalizado,
    actualizarPedidoPersonalizado,
    eliminarPedidoPersonalizado,
} = require("../controllers/pedidosPersonalizadosController");

const router = express.Router();

router.post("/agregarPedidoPersonalizado", agregarPedidoPersonalizado); 
router.get("/", obtenerPedidosPersonalizados);
router.get("/:id", obtenerPedidoPersonalizado); 
router.put("/actualizar/:id", actualizarPedidoPersonalizado);
router.delete("/eliminar/:id", eliminarPedidoPersonalizado);

module.exports = router;
