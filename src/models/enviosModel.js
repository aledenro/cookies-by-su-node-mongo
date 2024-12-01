const mongoose = require("mongoose");

const EnviosSchema = new mongoose.Schema(
    {
        pedidos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Pedido", 
            },
        ],
        pedidos_personalizados: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "PedidoPersonalizado",
            },
        ],
        estado_envio: { type: String },
        fecha_envio: { type: Date}, 
        fecha_entrega_estimada: { type: Date},
    },
    { collection: "envios" }
);

module.exports = mongoose.model("Envios", EnviosSchema);