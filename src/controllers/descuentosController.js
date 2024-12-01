const descuentosService = require("../services/descuentosService");

const agregarDescuento = async (req, res) => {
    try {
        const descuentoGuardado = await descuentosService.agregarDescuento(req.body);
        res.status(201).json(descuentoGuardado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerDescuentos = async (req, res) => {
    try {
        const descuentos = await descuentosService.obtenerDescuentos();
        res.status(200).json(descuentos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerDescuento = async (req, res) => {
    try {
        const { id } = req.params;
        const descuento = await descuentosService.obtenerDescuentoPorId(id);
        res.status(200).json(descuento);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const actualizarDescuento = async (req, res) => {
    try {
        const { id } = req.params;
        const descuentoActualizado = await descuentosService.actualizarDescuento(id, req.body);
        if (!descuentoActualizado) {
            return res.status(404).json({ error: "Descuento no encontrado" });
        }
        res.status(200).json(descuentoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminarDescuento = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await descuentosService.eliminarDescuento(id);
        if (!resultado) {
            return res.status(404).json({ error: "Descuento no encontrado" });
        }
        res.status(200).json({ message: "Descuento eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    agregarDescuento,
    obtenerDescuentos,
    actualizarDescuento,
    eliminarDescuento,
    obtenerDescuento,
};