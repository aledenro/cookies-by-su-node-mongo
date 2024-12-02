const EstadisticasVentas = require("../models/estadisticasVentasModel");
const Producto = require("../models/productosModel");

const registrarVenta = async (producto_id, cantidad, precio_unitario, mes, anio) => {
    try {
        const producto = await Producto.findById(producto_id);
        if (!producto) {
            throw new Error(`El producto con ID ${producto_id} no existe.`);
        }

        let estadistica = await EstadisticasVentas.findOne({ producto_id, mes, anio });
        if (!estadistica) {
            estadistica = new EstadisticasVentas({
                producto_id,
                ventas: cantidad,
                ingresos_totales: cantidad * precio_unitario,
                mes,
                anio,
            });
        } else {
            estadistica.ventas += cantidad;
            estadistica.ingresos_totales += cantidad * precio_unitario;
        }

        return await estadistica.save();
    } catch (error) {
        console.error("Error al registrar la venta:", error.message);
        throw error;
    }
};

const obtenerEstadisticasPorProducto = async (producto_id) => {
    try {
        return await EstadisticasVentas.find({ producto_id }).sort({ anio: -1, mes: -1 });
    } catch (error) {
        console.error("Error al obtener las estadísticas:", error.message);
        throw error;
    }
};

module.exports = {
    registrarVenta,
    obtenerEstadisticasPorProducto,
};
