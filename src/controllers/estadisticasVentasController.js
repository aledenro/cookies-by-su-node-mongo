const estadisticasVentasService = require("../services/estadisticasVentasService");

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

        res.status(201).json(estadistica);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const obtenerEstadisticasPorProducto = async (req, res) => {
    try {
        const { producto_id } = req.params;

        const estadisticas = await estadisticasVentasService.obtenerEstadisticasPorProducto(producto_id);
        if (!estadisticas || estadisticas.length === 0) {
            return res.status(404).json({ message: "No hay estadísticas disponibles para este producto." });
        }

        res.status(200).json(estadisticas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    registrarVenta,
    obtenerEstadisticasPorProducto,
};
