const productosRecomendadosService = require("../services/productosRecomendadosService");

const agregarProductosRecomendados = async (req, res) => {
    try {
        const { productos_recomendados } = req.body;

        if (!Array.isArray(productos_recomendados) || productos_recomendados.length === 0) {
            return res.status(400).json({ error: "Debes proporcionar una lista de productos recomendados." });
        }

        const recomendados = await productosRecomendadosService.agregarProductosRecomendados(productos_recomendados);
        res.status(201).json(recomendados);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const obtenerProductosRecomendados = async (req, res) => {
    try {
        const recomendados = await productosRecomendadosService.obtenerProductosRecomendados();
        if (!recomendados || recomendados.productos_recomendados.length === 0) {
            return res.status(404).json({ message: "No hay productos recomendados." });
        }

        res.status(200).json(recomendados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminarProductosRecomendados = async (req, res) => {
    try {
        const { productos } = req.body;

        if (!Array.isArray(productos) || productos.length === 0) {
            return res.status(400).json({ error: "Debes proporcionar una lista de productos a eliminar." });
        }

        const recomendadosActualizados = await productosRecomendadosService.eliminarProductosRecomendados(productos);
        res.status(200).json(recomendadosActualizados);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    agregarProductosRecomendados,
    obtenerProductosRecomendados,
    eliminarProductosRecomendados,
};
