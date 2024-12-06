const express = require("express");
const {
    crearPedido,
    obtenerPedidos,
    obtenerPedidoPorId,
    eliminarPedido,
} = require("../controllers/pedidosController");

const router = express.Router();

router.post("/crear", crearPedido); 
router.get("/", obtenerPedidos); 
router.get("/:id", obtenerPedidoPorId); 
router.delete("/:id", eliminarPedido); 

module.exports = router;
