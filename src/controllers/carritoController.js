const carritoService = require("../services/carritoService");
const mongoose = require("mongoose");

const agregarAlCarrito = async (req, res) => {
    try {
        const { cliente_id, productos } = req.body;

        const carrito = await carritoService.agregarAlCarrito(cliente_id, productos);
        res.status(201).json(carrito);
    } catch (error) {
        console.error("Error en agregarAlCarrito:", error.message);
        res.status(400).json({ error: error.message });
    }
};

const obtenerCarrito = async (req, res) => {
    try {
      const { cliente_id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(cliente_id)) {
        return res.status(400).json({ error: "El cliente_id no es un ObjectId válido." });
      }
  
      const carrito = await carritoService.obtenerCarrito(cliente_id);
      if (!carrito) {
        return res.status(404).json({ error: "Carrito no encontrado." });
      }
  
      res.status(200).json(carrito);
    } catch (error) {
      console.error("Error en obtenerCarrito:", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  

const eliminarProductoDelCarrito = async (req, res) => {
    try {
        const { cliente_id, producto_id } = req.params;

        const carrito = await carritoService.eliminarProductoDelCarrito(cliente_id, producto_id);
        res.status(200).json(carrito);
    } catch (error) {
        console.error("Error en eliminarProductoDelCarrito:", error.message);
        res.status(400).json({ error: error.message });
    }
};

const vaciarCarrito = async (req, res) => {
    try {
        const { cliente_id } = req.params;

        await carritoService.vaciarCarrito(cliente_id);
        res.status(200).json({ message: "Carrito vaciado con éxito." });
    } catch (error) {
        console.error("Error en vaciarCarrito:", error.message);
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    agregarAlCarrito,
    obtenerCarrito,
    eliminarProductoDelCarrito,
    vaciarCarrito,
};
