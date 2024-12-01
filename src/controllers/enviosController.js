const enviosService = require("../services/enviosService");

const agregarEnvio = async (req, res) => {
    try {
        const envioGuardado = await enviosService.agregarEnvio(req.body);
        res.status(201).json(envioGuardado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerEnvios = async (req, res) => {
    try {
        const envios = await enviosService.obtenerEnvios();
        res.status(200).json(envios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerEnvio = async (req, res) => {
    try {
        const { id } = req.params;
        const envio = await enviosService.obtenerEnvioPorId(id);
        res.status(200).json(envio);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const actualizarEnvio = async (req, res) => {
    try {
        const { id } = req.params;
        const envioActualizado = await enviosService.actualizarEnvio(id, req.body);
        res.status(200).json(envioActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminarEnvio = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await enviosService.eliminarEnvio(id);
        if (!resultado) {
            return res.status(404).json({ error: "Envío no encontrado" });
        }
        res.status(200).json({ message: "Envío eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    agregarEnvio,
    obtenerEnvios,
    obtenerEnvio,
    actualizarEnvio,
    eliminarEnvio,
};
