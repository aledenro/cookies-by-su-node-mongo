const mongoose = require("mongoose");

const EmpleadoSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: true },
        cargo: { type: String, required: true },
        salario: { type: Number, required: true },
        fecha_ingreso: { type: Date, default: Date.now }, 
    },
    { collection: "empleados" }
);

module.exports = mongoose.model("Empleado", EmpleadoSchema);
