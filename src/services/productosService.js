const Producto = require("../models/productosModel");

const agregarProducto = async (producto) => {
    try {
        const nuevoProducto = new Producto(producto);
        return await nuevoProducto.save();
    } catch (error) {
        console.error("Error al agregar el producto:", error);
        throw new Error("No se pudo agregar el producto.");
    }
};

const obtenerProductos = async () => {
    try {
        return await Producto.find();
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        throw new Error("No se pudieron obtener los productos.");
    }
};

const obtenerProductoPorId = async (id) => {
    try {
        const producto = await Producto.findById(id);
        if (!producto) {
            throw new Error("Producto no encontrado");
        }
        return producto;
    } catch (error) {
        console.error("Error al obtener el producto por ID:", error);
        throw error;
    }
};

const actualizarProducto = async (id, datosActualizados) => {
    try {
        return await Producto.findByIdAndUpdate(id, datosActualizados, { new: true });
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        throw new Error("No se pudo actualizar el producto.");
    }
};

const eliminarProducto = async (id) => {
    try {
        return await Producto.findByIdAndDelete(id);
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        throw new Error("No se pudo eliminar el producto.");
    }
};

module.exports = {
    agregarProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto,
};
