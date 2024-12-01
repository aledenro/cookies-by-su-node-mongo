const PedidoPersonalizado = require("../models/pedidosPersonalizadosModel");

const agregarPedidoPersonalizado = async (pedidoData) => {
    try {
        const nuevoPedido = new PedidoPersonalizado(pedidoData);
        const pedidoGuardado = await nuevoPedido.save();
        return pedidoGuardado;
    } catch (error) {
        console.error("Error al agregar el pedido personalizado:", error);
        throw error;
    }
};

const obtenerPedidosPersonalizados = async () => {
    try {
        return await PedidoPersonalizado.find().populate("usuario_id", "nombre"); 
    } catch (error) {
        console.error("Error al obtener los pedidos personalizados:", error);
        throw error;
    }
};

const obtenerPedidoPersonalizadoPorId = async (id) => {
    try {
        const pedido = await PedidoPersonalizado.findById(id).populate(
            "usuario_id",
            "nombre"
        );
        if (!pedido) {
            throw new Error("Pedido personalizado no encontrado");
        }
        return pedido;
    } catch (error) {
        console.error("Error al obtener el pedido personalizado por ID:", error);
        throw error;
    }
};

const actualizarPedidoPersonalizado = async (id, datosActualizados) => {
    try {
        const pedidoActualizado = await PedidoPersonalizado.findByIdAndUpdate(
            id,
            datosActualizados,
            { new: true }
        ).populate("usuario_id", "nombre");
        return pedidoActualizado;
    } catch (error) {
        console.error("Error al actualizar el pedido personalizado:", error);
        throw error;
    }
};

const eliminarPedidoPersonalizado = async (id) => {
    try {
        return await PedidoPersonalizado.findByIdAndDelete(id);
    } catch (error) {
        console.error("Error al eliminar el pedido personalizado:", error);
        throw error;
    }
};

module.exports = {
    agregarPedidoPersonalizado,
    obtenerPedidosPersonalizados,
    obtenerPedidoPersonalizadoPorId,
    actualizarPedidoPersonalizado,
    eliminarPedidoPersonalizado,
};
