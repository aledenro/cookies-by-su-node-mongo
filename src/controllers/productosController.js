const productosService = require("../services/productosService");
const Producto = require("../models/productosModel");
const mongoose = require("mongoose");

const agregarProducto = async (req, res) => {
    try {
        const {
            nombre = req.body.nombre,
            descripcion = req.body.descripcion,
            categoria = req.body.categoria,
            precio = req.body.precio,
            stock = req.body.stock,
            imagenes = req.body.imagenes,
            estado = req.body.estado,
        } = req.body;

        const nuevoProducto = await productosService.agregarProducto({
            nombre,
            descripcion,
            categoria,
            precio,
            stock,
            imagenes,
            estado,
        });

        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerProductos = async (req, res) => {
    try {
        const productos = await productosService.obtenerProductos();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerProducto = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const producto = await productosService.obtenerProductoPorId(id);
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const productoActualizado = await Producto.findByIdAndUpdate(id, req.body, { new: true });
        if (!productoActualizado) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.status(200).json(productoActualizado);
    } catch (error) {
        console.error("Error al actualizar el producto:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const resultado = await productosService.eliminarProducto(id);
        if (!resultado) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.status(200).json({ message: "Producto eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    agregarProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto,
};
