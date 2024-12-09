const express = require("express");
const upload = require("../middlewares/multerConfig");
const {
    agregarPedidoPersonalizado,
    obtenerPedidosPersonalizados,
    obtenerPedidoPersonalizado,
    actualizarPedidoPersonalizado,
    eliminarPedidoPersonalizado,
} = require("../controllers/pedidosPersonalizadosController");

const router = express.Router();

router.post("/agregar", upload.array("imagenes"), agregarPedidoPersonalizado); 
router.get("/", obtenerPedidosPersonalizados);
router.get("/:id", obtenerPedidoPersonalizado); 
router.put("/actualizar/:id", upload.array("imagenes"), actualizarPedidoPersonalizado);
router.delete("/eliminar/:id", eliminarPedidoPersonalizado);

module.exports = router;
