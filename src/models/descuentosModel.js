const mongoose = require("mongoose");

const Descuento = new mongoose.Schema({
    descuento : {type: Number},
    fecha_inicio : {type: Date},
    fecha_expiracion : {type: Date},
    estado : {type: String}
    },
    { collection: "descuentos" }
);

module.exports = mongoose.model("Descuento", Descuento);
