const ProductosRecomendados = require("../models/productosRecomendadosModel");
const Producto = require("../models/productosModel"); // Asegúrate de que este modelo apunta a la colección "productos"

const agregarProductosRecomendados = async (productos) => {
    try {
        for (const producto_id of productos) {
            const producto = await Producto.findById(producto_id);
            if (!producto) {
                throw new Error(`El producto con ID ${producto_id} no existe en la colección 'productos'.`);
            }
        }

        const recomendados = await ProductosRecomendados.findOne();
        if (recomendados) {
            recomendados.productos_recomendados = productos;
            return await recomendados.save(); 
        } else {
            const nuevaRecomendacion = new ProductosRecomendados({ productos_recomendados: productos });
            return await nuevaRecomendacion.save();
        }
    } catch (error) {
        console.error("Error al agregar productos recomendados:", error.message);
        throw error;
    }
};

const obtenerProductosRecomendados = async () => {
    try {
        return await ProductosRecomendados.findOne().populate("productos_recomendados");
    } catch (error) {
        console.error("Error al obtener productos recomendados:", error.message);
        throw error;
    }
};

const eliminarProductosRecomendados = async (productos) => {
    try {
        const recomendados = await ProductosRecomendados.findOne();
        if (!recomendados) {
            throw new Error("No hay productos recomendados para eliminar.");
        }

        recomendados.productos_recomendados = recomendados.productos_recomendados.filter(
            (producto_id) => !productos.includes(producto_id.toString())
        );

        return await recomendados.save();
    } catch (error) {
        console.error("Error al eliminar productos recomendados:", error.message);
        throw error;
    }
};

module.exports = {
    agregarProductosRecomendados,
    obtenerProductosRecomendados,
    eliminarProductosRecomendados,
};
