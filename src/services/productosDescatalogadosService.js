const ProductosDescatalogados = require("../models/productosDescatalogadosModel");
const Producto = require("../models/productosModel");

const agregarProductoDescatalogado = async ({ producto_id, fecha_descatalogado, razon_descatalogado }) => {
    try {
        const producto = await Producto.findById(producto_id);
        if (!producto) {
            throw new Error(`El producto con ID ${producto_id} no existe.`);
        }

        const nuevoDescatalogado = new ProductosDescatalogados({
            producto_id,
            nombre: producto.nombre, 
            fecha_descatalogado,
            razon_descatalogado,
        });

        return await nuevoDescatalogado.save();
    } catch (error) {
        console.error("Error al agregar el producto descatalogado:", error.message);
        throw error;
    }
};

const obtenerProductosDescatalogados = async () => {
    try {
        return await ProductosDescatalogados.find().populate("producto_id");
    } catch (error) {
        console.error("Error al obtener los productos descatalogados:", error.message);
        throw error;
    }
};

const eliminarProductoDescatalogado = async (producto_id) => {
    try {
        const productoEliminado = await ProductosDescatalogados.findOneAndDelete({ producto_id });
        if (!productoEliminado) {
            throw new Error(`El producto con ID ${producto_id} no está en la lista de descatalogados.`);
        }
        return productoEliminado;
    } catch (error) {
        console.error("Error al eliminar el producto descatalogado:", error.message);
        throw error;
    }
};

module.exports = {
    agregarProductoDescatalogado,
    obtenerProductosDescatalogados,
    eliminarProductoDescatalogado,
};
