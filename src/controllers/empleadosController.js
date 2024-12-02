const empleadosService = require("../services/empleadosService");

const agregarEmpleado = async (req, res) => {
    try {
        const { nombre, cargo, salario } = req.body;

        if (!nombre || !cargo || !salario) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }

        const empleado = await empleadosService.agregarEmpleado({ nombre, cargo, salario });
        res.status(201).json(empleado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const obtenerEmpleados = async (req, res) => {
    try {
        const empleados = await empleadosService.obtenerEmpleados();
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerEmpleadoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const empleado = await empleadosService.obtenerEmpleadoPorId(id);
        if (!empleado) {
            return res.status(404).json({ error: "Empleado no encontrado." });
        }

        res.status(200).json(empleado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const actualizarEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        const empleadoActualizado = await empleadosService.actualizarEmpleado(id, datosActualizados);
        if (!empleadoActualizado) {
            return res.status(404).json({ error: "Empleado no encontrado." });
        }

        res.status(200).json(empleadoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminarEmpleado = async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await empleadosService.eliminarEmpleado(id);
        if (!resultado) {
            return res.status(404).json({ error: "Empleado no encontrado." });
        }

        res.status(200).json({ message: "Empleado eliminado con éxito." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    agregarEmpleado,
    obtenerEmpleados,
    obtenerEmpleadoPorId,
    actualizarEmpleado,
    eliminarEmpleado,
};
