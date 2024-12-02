const mongoose = require("mongoose");

const PagoSchema = new mongoose.Schema(
    {
        monto: { type: Number, required: true },
        metodo_pago: { type: String, required: true },
        fecha_pago: { type: Date, default: Date.now },
        estado: { type: String, enum: ["Completado", "Pendiente"], required: true },
    },
    { collection: "pagos" }
);

module.exports = mongoose.model("Pago", PagoSchema);
