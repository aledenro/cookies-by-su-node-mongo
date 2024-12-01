
const Descuento = require("../models/descuentosModel");

const agregarDescuento = async (descuento) =>{
    try {
        const nuevoDescuento = new Descuento(descuento);
        const descuentoGuardado = await nuevoDescuento.save();
        return descuentoGuardado;
    } catch (error) {
        console.log(error);
    }
    
}; 
const obtenerDescuentos = async () => {
    try {
        const descuentos = await Descuento.find();
        return descuentos;
    } catch (error) {
        console.error("Error al obtener los descuentos:", error);
        throw new Error("No se pudo obtener la lista de descuentos.");
    }
};

const obtenerDescuentoPorId = async (id) => {
    try {
        const descuento = await Descuento.findById(id);
        if (!descuento) {
            throw new Error("Descuento no encontrado");
        }
        return descuento;
    } catch (error) {
        console.error("Error al obtener el descuento por ID:", error);
        throw error;
    }
};

const actualizarDescuento = async (id, datosActualizados) => {
    try {
        const descuentoActualizado = await Descuento.findByIdAndUpdate(
            id,
            datosActualizados,
            { new: true } 
        );
        return descuentoActualizado;
    } catch (error) {
        console.error("Error al actualizar el descuento:", error);
        throw new Error("No se pudo actualizar el descuento.");
    }
};

const eliminarDescuento = async (id) => {
    try {
        const resultado = await Descuento.findByIdAndDelete(id);
        return resultado;
    } catch (error) {
        console.error("Error al eliminar el descuento:", error);
        throw new Error("No se pudo eliminar el descuento.");
    }
};

module.exports = {
    agregarDescuento,
    obtenerDescuentos,
    actualizarDescuento,
    eliminarDescuento,
    obtenerDescuentoPorId,
};
        
    




