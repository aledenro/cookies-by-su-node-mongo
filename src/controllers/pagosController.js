const pagosService = require("../services/pagosService");
const carritoService = require("../services/carritoService");
const productoService = require("../services/productosService"); 
const Pedido = require("../models/pedidosPersonalizadosModel");
const mongoose = require("mongoose");

const agregarPago = async (req, res) => {
    try {
        const { cliente_id, monto, metodo_pago, estado } = req.body;

        const carrito = await carritoService.obtenerCarrito(cliente_id);
        if (!carrito || carrito.productos.length === 0) {
            return res.status(400).json({ error: "El carrito está vacío o no existe." });
        }

        for (const item of carrito.productos) {
            const producto = await Producto.findById(item.producto_id);
            if (!producto) {
                return res.status(404).json({ error: `Producto con ID ${item.producto_id} no encontrado.` });
            }

            if (producto.stock < item.cantidad) {
                return res.status(400).json({
                    error: `Stock insuficiente para el producto ${producto.nombre}.`,
                });
            }

            producto.stock -= item.cantidad;
            await producto.save();
        }

        const nuevoPedido = new Pedido({
            cliente_id,
            productos: carrito.productos,
            total: carrito.total,
            fecha_pedido: new Date(),
        });
        await nuevoPedido.save();

        const nuevoPago = await pagosService.agregarPago({
            monto,
            metodo_pago,
            estado,
        });

        await carritoService.vaciarCarrito(cliente_id);

        res.status(201).json({
            message: "Pago procesado con éxito.",
            pago: nuevoPago,
            pedido: nuevoPedido,
        });
    } catch (error) {
        console.error("Error en agregarPago:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const obtenerPagos = async (req, res) => {
    try {
        const pagos = await pagosService.obtenerPagos();
        res.status(200).json(pagos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerPago = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const pago = await pagosService.obtenerPagoPorId(id);
        if (!pago) {
            return res.status(404).json({ error: "Pago no encontrado" });
        }

        res.status(200).json(pago);
    } catch (error) {
        console.error("Error al obtener el pago:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const actualizarPago = async (req, res) => {
    try {
        const { id } = req.params;
        const pagoActualizado = await pagosService.actualizarPago(id, req.body);
        if (!pagoActualizado) {
            return res.status(404).json({ error: "Pago no encontrado" });
        }
        res.status(200).json(pagoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminarPago = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pagosService.eliminarPago(id);
        if (!resultado) {
            return res.status(404).json({ error: "Pago no encontrado" });
        }
        res.status(200).json({ message: "Pago eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    agregarPago,
    obtenerPagos,
    obtenerPago,
    actualizarPago,
    eliminarPago,
};
