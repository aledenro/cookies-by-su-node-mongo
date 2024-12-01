const pedidosPersonalizadosService = require("../services/pedidosPersonalizadosService");

const agregarPedidoPersonalizado = async (req, res) => {
    try {
        const pedidoGuardado = await pedidosPersonalizadosService.agregarPedidoPersonalizado(req.body);
        res.status(201).json(pedidoGuardado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerPedidosPersonalizados = async (req, res) => {
    try {
        const pedidos = await pedidosPersonalizadosService.obtenerPedidosPersonalizados();
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerPedidoPersonalizado = async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await pedidosPersonalizadosService.obtenerPedidoPersonalizadoPorId(id);
        res.status(200).json(pedido);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const actualizarPedidoPersonalizado = async (req, res) => {
    try {
        const { id } = req.params;
        const pedidoActualizado = await pedidosPersonalizadosService.actualizarPedidoPersonalizado(
            id,
            req.body
        );
        res.status(200).json(pedidoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminarPedidoPersonalizado = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pedidosPersonalizadosService.eliminarPedidoPersonalizado(id);
        if (!resultado) {
            return res.status(404).json({ error: "Pedido personalizado no encontrado" });
        }
        res.status(200).json({ message: "Pedido personalizado eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    agregarPedidoPersonalizado,
    obtenerPedidosPersonalizados,
    obtenerPedidoPersonalizado,
    actualizarPedidoPersonalizado,
    eliminarPedidoPersonalizado,
};
