const estadisticasVentasService = require("../services/estadisticasVentasService");
const User = require("../models/userModel");
const Pedido = require("../models/pedidosPersonalizadosModel");

const registrarVenta = async (req, res) => {
    try {
        const { producto_id, cantidad, precio_unitario, mes, anio } = req.body;

        if (!producto_id || !cantidad || !precio_unitario || !mes || !anio) {
            return res.status(400).json({ error: "Faltan datos requeridos para registrar la venta." });
        }

        const estadistica = await estadisticasVentasService.registrarVenta(
            producto_id,
            cantidad,
            precio_unitario,
            mes,
            anio
        );

        res.status(201).json({ message: "Venta registrada correctamente", estadistica });
    } catch (error) {
        console.error("Error en registrarVenta:", error.message);
        res.status(500).json({ error: "Error al registrar la venta: " + error.message });
    }
};

const obtenerEstadisticasPorProducto = async (req, res) => {
    try {
        const { producto_id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(producto_id)) {
            return res.status(400).json({ message: "ID de producto inválido" });
        }

        const estadisticas = await estadisticasVentasService.obtenerEstadisticasPorProducto(producto_id);
        if (!estadisticas || estadisticas.length === 0) {
            return res.status(404).json({ message: "No hay estadísticas disponibles para este producto." });
        }

        res.status(200).json(estadisticas);
    } catch (error) {
        console.error("Error en obtenerEstadisticasPorProducto:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const obtenerEstadisticasGenerales = async (req, res) => {
    try {
        const totalUsuarios = await User.countDocuments();

        const ventas = await Pedido.aggregate([
            { $unwind: "$productos" },
            {
                $group: {
                    _id: null,
                    totalCantidad: { $sum: "$productos.cantidad" },
                    totalPrecio: { $sum: "$productos.precio" },
                },
            },
        ]);

        const { totalCantidad = 0, totalPrecio = 0 } = ventas[0] || {};

        res.status(200).json({
            totalUsuarios,
            totalProductosVendidos: totalCantidad,
            totalPrecioVendido: totalPrecio,
        });
    } catch (error) {
        console.error("Error en obtenerEstadisticasGenerales:", error.message);
        res.status(500).json({ message: "Error al obtener estadísticas generales: " + error.message });
    }
};

module.exports = {
    registrarVenta,
    obtenerEstadisticasPorProducto,
    obtenerEstadisticasGenerales,
};