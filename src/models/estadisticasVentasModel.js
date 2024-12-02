const mongoose = require("mongoose");

const EstadisticasVentasSchema = new mongoose.Schema(
    {
        producto_id: { type: mongoose.Schema.Types.ObjectId, ref: "productos", required: true },
        ventas: { type: Number, default: 0 }, 
        ingresos_totales: { type: Number, default: 0.0 }, 
        mes: { type: String, required: true }, 
        anio: { type: Number, required: true }, 
    },
    { collection: "estadisticas_ventas" }
);

module.exports = mongoose.model("EstadisticasVentas", EstadisticasVentasSchema);
