const Empleado = require("../models/empleadosModel");

const agregarEmpleado = async (empleado) => {
    try {
        const nuevoEmpleado = new Empleado(empleado);
        return await nuevoEmpleado.save();
    } catch (error) {
        console.error("Error al agregar el empleado:", error.message);
        throw error;
    }
};

const obtenerEmpleados = async () => {
    try {
        return await Empleado.find().sort({ fecha_ingreso: -1 });
    } catch (error) {
        console.error("Error al obtener los empleados:", error.message);
        throw error;
    }
};

const obtenerEmpleadoPorId = async (id) => {
    try {
        return await Empleado.findById(id);
    } catch (error) {
        console.error("Error al obtener el empleado por ID:", error.message);
        throw error;
    }
};

const actualizarEmpleado = async (id, datosActualizados) => {
    try {
        return await Empleado.findByIdAndUpdate(id, datosActualizados, { new: true });
    } catch (error) {
        console.error("Error al actualizar el empleado:", error.message);
        throw error;
    }
};

const eliminarEmpleado = async (id) => {
    try {
        return await Empleado.findByIdAndDelete(id);
    } catch (error) {
        console.error("Error al eliminar el empleado:", error.message);
        throw error;
    }
};

module.exports = {
    agregarEmpleado,
    obtenerEmpleados,
    obtenerEmpleadoPorId,
    actualizarEmpleado,
    eliminarEmpleado,
};
