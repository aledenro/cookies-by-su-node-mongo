const mongoose = require("mongoose");

const PedidosPersonalizadosSchema = new mongoose.Schema(
  {
    usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }, 
    descripcion: { type: String, required: true },
    cantidad: { type: Number, required: true },
    imagenes: [{ type: String }], 
    correo_electronico: { type: String, required: true },
    telefono_celular: { type: String, required: true },
    fecha_entrega: { type: Date, required: true },
    estado: { type: String, default: "Pendiente" },
    fecha_pedido: { type: Date, default: Date.now },
  },
  { collection: "pedidos_personalizados" }
);

module.exports = mongoose.model(
  "PedidosPersonalizados",
  PedidosPersonalizadosSchema
);
