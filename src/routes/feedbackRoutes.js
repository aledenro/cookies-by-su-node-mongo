const express = require("express");
const {
    agregarFeedback,
    obtenerFeedbacksPorProducto,
    obtenerFeedbacksPorCliente,
} = require("../controllers/feedbackController");

const router = express.Router();

router.post("/agregar", agregarFeedback);
router.get("/producto/:producto_id", obtenerFeedbacksPorProducto);
router.get("/cliente/:cliente_id", obtenerFeedbacksPorCliente);

module.exports = router;
