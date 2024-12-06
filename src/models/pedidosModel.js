const mongoose = require("mongoose");

const PedidoSchema = new mongoose.Schema(
    {
        cliente_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        productos: [
            {
                producto_id: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
                cantidad: { type: Number, required: true },
                precio_unitario: { type: Number, required: true },
            },
        ],
        total: { type: Number, required: true },
        fecha_pedido: { type: Date, default: Date.now },
    },
    { collection: "pedidos" }
);

module.exports = mongoose.model("Pedido", PedidoSchema);
