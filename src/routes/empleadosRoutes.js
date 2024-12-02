const express = require("express");
const {
    agregarEmpleado,
    obtenerEmpleados,
    obtenerEmpleadoPorId,
    actualizarEmpleado,
    eliminarEmpleado,
} = require("../controllers/empleadosController");

const router = express.Router();

router.post("/agregar", agregarEmpleado); 
router.get("/", obtenerEmpleados);
router.get("/:id", obtenerEmpleadoPorId); 
router.put("/actualizar/:id", actualizarEmpleado); 
router.delete("/eliminar/:id", eliminarEmpleado); 

module.exports = router;
