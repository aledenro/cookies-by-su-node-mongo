const pedidosPersonalizadosService = require("../services/pedidosPersonalizadosService");
const { uploadImageToFirebase } = require("../utils/firebaseConfig");
const PedidoPersonalizado = require("../models/pedidosPersonalizadosModel");


const agregarPedidoPersonalizado = async (req, res) => {
    try {
        const { descripcion, cantidad, correo_electronico, telefono_celular, fecha_entrega } = req.body;
        const imagenes = [];

        if (req.files) {
            for (const file of req.files) {
                const fileName = `pedidos/${Date.now()}_${file.originalname}`;
                const imageUrl = await uploadImageToFirebase(file, fileName);
                imagenes.push(imageUrl);
            }
        }

        const pedidoData = {
            descripcion,
            cantidad: parseInt(cantidad),
            imagenes,
            correo_electronico,
            telefono_celular,
            fecha_entrega,
            fecha_pedido: new Date(),
        };

        const pedidoGuardado = await pedidosPersonalizadosService.agregarPedidoPersonalizado(pedidoData);
        res.status(201).json(pedidoGuardado);
    } catch (error) {
        console.error("Error al agregar el pedido personalizado:", error);
        res.status(500).json({ error: error.message });
    }
};


const obtenerPedidosPersonalizados = async (req, res) => {
    try {
        const pedidos = await PedidoPersonalizado.find();
        res.status(200).json(pedidos);
    } catch (error) {
        console.error("Error al obtener los pedidos personalizados:", error);
        res.status(500).json({ error: "Error al obtener los pedidos personalizados" });
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
