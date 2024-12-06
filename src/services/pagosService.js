const Pago = require("../models/pagosModel");
const Producto = require("../models/productosModel");

const agregarPago = async (pago) => {
    try {
        const nuevoPago = new Pago(pago);
        return await nuevoPago.save();
    } catch (error) {
        console.error("Error al agregar el pago:", error);
        throw new Error("No se pudo agregar el pago.");
    }
};

const obtenerPagos = async () => {
    try {
        return await Pago.find();
    } catch (error) {
        console.error("Error al obtener los pagos:", error);
        throw new Error("No se pudieron obtener los pagos.");
    }
};

const obtenerPagoPorId = async (id) => {
    try {
        const pago = await Pago.findById(id);
        if (!pago) {
            throw new Error("Pago no encontrado");
        }
        return pago;
    } catch (error) {
        console.error("Error al obtener el pago por ID:", error);
        throw error;
    }
};

const actualizarPago = async (id, datosActualizados) => {
    try {
        return await Pago.findByIdAndUpdate(id, datosActualizados, { new: true });
    } catch (error) {
        console.error("Error al actualizar el pago:", error);
        throw new Error("No se pudo actualizar el pago.");
    }
};

const eliminarPago = async (id) => {
    try {
        return await Pago.findByIdAndDelete(id);
    } catch (error) {
        console.error("Error al eliminar el pago:", error);
        throw new Error("No se pudo eliminar el pago.");
    }
};

const reducirStock = async (producto_id, cantidad) => {
    try {
        const producto = await Producto.findById(producto_id);
        if (!producto) throw new Error(`Producto con ID ${producto_id} no encontrado.`);
        if (producto.stock < cantidad) throw new Error(`Stock insuficiente para el producto ${producto.nombre}.`);

        producto.stock -= cantidad;
        await producto.save();
    } catch (error) {
        console.error("Error al reducir stock:", error.message);
        throw error;
    }
};

module.exports = {
    agregarPago,
    obtenerPagos,
    obtenerPagoPorId,
    actualizarPago,
    eliminarPago,
    reducirStock,
};
