const productosDescatalogadosService = require("../services/productosDescatalogadosService");

const agregarProductoDescatalogado = async (req, res) => {
    try {
        const { producto_id, fecha_descatalogado, razon_descatalogado } = req.body;

        if (!producto_id || !fecha_descatalogado || !razon_descatalogado) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }

        const productoDescatalogado = await productosDescatalogadosService.agregarProductoDescatalogado({
            producto_id,
            fecha_descatalogado,
            razon_descatalogado,
        });

        res.status(201).json(productoDescatalogado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const obtenerProductosDescatalogados = async (req, res) => {
    try {
        const productosDescatalogados = await productosDescatalogadosService.obtenerProductosDescatalogados();
        res.status(200).json(productosDescatalogados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminarProductoDescatalogado = async (req, res) => {
    try {
        const { producto_id } = req.params;

        if (!producto_id) {
            return res.status(400).json({ error: "El ID del producto es obligatorio." });
        }

        const productoEliminado = await productosDescatalogadosService.eliminarProductoDescatalogado(producto_id);
        res.status(200).json({ message: "Producto eliminado de la lista de descatalogados.", productoEliminado });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    agregarProductoDescatalogado,
    obtenerProductosDescatalogados,
    eliminarProductoDescatalogado,
};
