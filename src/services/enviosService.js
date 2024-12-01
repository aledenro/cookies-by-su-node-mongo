const Envio = require("../models/enviosModel");

const agregarEnvio = async (envioData) => {
    try {
        const nuevoEnvio = new Envio(envioData);
        const envioGuardado = await nuevoEnvio.save();
        return envioGuardado;
    } catch (error) {
        console.error("Error al agregar el envío:", error);
        throw error;
    }
};

const obtenerEnvios = async () => {
    try {
        return await Envio.find();
    } catch (error) {
        console.error("Error al obtener los envíos:", error);
        throw error;
    }
};

const obtenerEnvioPorId = async (id) => {
    try {
        const envio = await Envio.findById(id);
        if (!envio) {
            throw new Error("Envío no encontrado");
        }
        return envio;
    } catch (error) {
        console.error("Error al obtener el envío por ID:", error);
        throw error;
    }
};

const actualizarEnvio = async (id, datosActualizados) => {
    try {
        const envioActualizado = await Envio.findByIdAndUpdate(id, datosActualizados, {
            new: true,
        });
        return envioActualizado;
    } catch (error) {
        console.error("Error al actualizar el envío:", error);
        throw error;
    }
};

const eliminarEnvio = async (id) => {
    try {
        return await Envio.findByIdAndDelete(id);
    } catch (error) {
        console.error("Error al eliminar el envío:", error);
        throw error;
    }
};

module.exports = {
    agregarEnvio,
    obtenerEnvios,
    obtenerEnvioPorId,
    actualizarEnvio,
    eliminarEnvio,
};
