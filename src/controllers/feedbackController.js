const feedbackService = require("../services/feedbackService");

const agregarFeedback = async (req, res) => {
    try {
        const { producto_id, cliente_id, valoracion, comentarios } = req.body;

        if (valoracion < 1 || valoracion > 5) {
            return res.status(400).json({ error: "La valoración debe estar entre 1 y 5." });
        }

        const feedback = await feedbackService.agregarFeedback({
            producto_id,
            cliente_id,
            valoracion,
            comentarios,
        });

        res.status(201).json(feedback);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const obtenerFeedbacksPorProducto = async (req, res) => {
    try {
        const { producto_id } = req.params;

        const feedbacks = await feedbackService.obtenerFeedbacksPorProducto(producto_id);
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerFeedbacksPorCliente = async (req, res) => {
    try {
        const { cliente_id } = req.params;

        const feedbacks = await feedbackService.obtenerFeedbacksPorCliente(cliente_id);
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    agregarFeedback,
    obtenerFeedbacksPorProducto,
    obtenerFeedbacksPorCliente,
};
