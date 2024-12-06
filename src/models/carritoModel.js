const mongoose = require("mongoose");

const CarritoSchema = new mongoose.Schema(
    {
        cliente_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        productos: [
            {
                producto_id: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
                cantidad: {
                    type: Number,
                    required: true,
                    validate: {
                        validator: async function (value) {
                            const producto = await mongoose.model("Producto").findById(this.producto_id);
                            return value <= producto.stock;
                        },
                        message: "La cantidad no puede exceder el stock disponible.",
                    },
                },
            },
        ],
        total: { type: Number, required: true, default: 0 },
        fecha_creacion: { type: Date, default: Date.now },
    },
    { collection: "carrito_compras" }
);

module.exports = mongoose.model("Carrito", CarritoSchema);
