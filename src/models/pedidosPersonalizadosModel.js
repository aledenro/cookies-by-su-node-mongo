const mongoose = require("mongoose");

const PedidosPersonalizadosSchema = new mongoose.Schema(
    {
        usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users",}, 
        productos: [
            {
                descripcion_producto: { type: String,},
                cantidad: { type: Number,  },
            },
        ],
        estado: { type: String},
        fecha_pedido: { type: Date }, 
        fecha_entrega: { type: Date },
    },
    { collection: "pedidos_personalizados" }
);

module.exports = mongoose.model("PedidosPersonalizados", PedidosPersonalizadosSchema);
