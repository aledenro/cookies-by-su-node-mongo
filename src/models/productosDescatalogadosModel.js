const mongoose = require("mongoose");

const ProductosDescatalogadosSchema = new mongoose.Schema(
    {
        producto_id: { type: mongoose.Schema.Types.ObjectId, ref: "productos", required: true }, 
        nombre: { type: String, required: true },
        fecha_descatalogado: { type: Date, required: true },
        razon_descatalogado: { type: String, required: true }, 
    },
    { collection: "productos_descatalogados" }
);

module.exports = mongoose.model("ProductosDescatalogados", ProductosDescatalogadosSchema);
