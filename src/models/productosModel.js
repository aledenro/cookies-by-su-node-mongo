const mongoose = require("mongoose");

const ProductoSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: true },
        descripcion: { type: String, required: true },
        categoria: { type: String, required: true },
        precio: { type: Number, required: true },
        stock: { type: Number, required: true },
        imagenes: {
            type: [String],
            default: ["https://r2.fivemanage.com/pub/kliiuf589hjj.webp"], 
        },
        fecha_agregado: { type: Date, default: Date.now }, 
        estado: { type: String, enum: ["Activo", "Descontinuado", "Agotado"], required: true },
    },
    { collection: "productos" }
);

module.exports = mongoose.model("Producto", ProductoSchema);
