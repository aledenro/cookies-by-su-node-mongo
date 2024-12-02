const pagosService = require("../services/pagosService");
const mongoose = require("mongoose");

const agregarPago = async (req, res) => {
    try {
        const {
            monto = req.body.monto,
            metodo_pago = req.body.metodo_pago,
            estado = req.body.estado,
        } = req.query;

        const nuevoPago = await pagosService.agregarPago({
            monto,
            metodo_pago,
            estado,
        });

        res.status(201).json(nuevoPago);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const obtenerPagos = async (req, res) => {
    try {
        const pagos = await pagosService.obtenerPagos();
        res.status(200).json(pagos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerPago = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const pago = await pagosService.obtenerPagoPorId(id);
        if (!pago) {
            return res.status(404).json({ error: "Pago no encontrado" });
        }

        res.status(200).json(pago);
    } catch (error) {
        console.error("Error al obtener el pago:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const actualizarPago = async (req, res) => {
    try {
        const { id } = req.params;
        const pagoActualizado = await pagosService.actualizarPago(id, req.body);
        if (!pagoActualizado) {
            return res.status(404).json({ error: "Pago no encontrado" });
        }
        res.status(200).json(pagoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminarPago = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pagosService.eliminarPago(id);
        if (!resultado) {
            return res.status(404).json({ error: "Pago no encontrado" });
        }
        res.status(200).json({ message: "Pago eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    agregarPago,
    obtenerPagos,
    obtenerPago,
    actualizarPago,
    eliminarPago,
};
