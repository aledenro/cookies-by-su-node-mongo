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
            default: ["https://r2.fivemanage.com/kbqI3AHdhK2QGt3ZcWIHM/pngtree-cute-kawaii-kawaii-cookie-with-blue-eyes-and-a-smiling-face-vector-png-image_6913021.png"], 
        },
        fecha_agregado: { type: Date, default: Date.now }, 
        estado: { type: String, enum: ["Activo", "Descontinuado", "Agotado"], required: true },
    },
    { collection: "productos" }
);

module.exports = mongoose.model("Producto", ProductoSchema);
