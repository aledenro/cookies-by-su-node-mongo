const mongoose = require("mongoose");

const ProductosRecomendadosSchema = new mongoose.Schema(
    {
        productos_recomendados: [
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "productos", 
                required: true 
            },
        ],
    },
    { collection: "productos_recomendados" }
);

module.exports = mongoose.model("ProductosRecomendados", ProductosRecomendadosSchema);
