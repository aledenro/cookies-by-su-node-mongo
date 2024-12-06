import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeePanel = () => {
    const [empleados, setEmpleados] = useState([]);
    const [formData, setFormData] = useState({
        nombre: "",
        cargo: "",
        salario: "",
    });
    const [editId, setEditId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const apiBaseUrl = "http://localhost:4000/api/empleados";

    useEffect(() => {
        const fetchEmpleados = async () => {
            try {
                console.log("Fetching empleados...");
                const res = await axios.get(apiBaseUrl);
                console.log("Response:", res.data);
                setEmpleados(res.data);
            } catch (error) {
                console.error("Error al cargar empleados:", error);
            }
        };
        fetchEmpleados();
    }, []);
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editId) {
                await axios.put(`${apiBaseUrl}/actualizar/${editId}`, formData);
                setEmpleados((prev) =>
                    prev.map((emp) => (emp._id === editId ? { ...emp, ...formData } : emp))
                );
            } else {
                const res = await axios.post(`${apiBaseUrl}/agregar`, formData);
                setEmpleados([...empleados, res.data]);
            }

            setFormData({
                nombre: "",
                cargo: "",
                salario: "",
            });
            setEditId(null);
        } catch (error) {
            console.error("Error al guardar empleado:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiBaseUrl}/eliminar/${id}`);
            setEmpleados(empleados.filter((emp) => emp._id !== id));
        } catch (error) {
            console.error("Error al eliminar empleado:", error);
        }
    };

    const handleEdit = (empleado) => {
        setEditId(empleado._id);
        setFormData({
            nombre: empleado.nombre,
            cargo: empleado.cargo,
            salario: empleado.salario,
        });
    };

    const totalPages = Math.ceil(empleados.length / itemsPerPage);

    return (
        <>
            <div className="bg-gray-100">
                <Navbar />
                <header className="relative bg-gray-100 overflow-hidden py-20">
                    <div className="absolute top-[-100px] left-1/2 transform -translate-x-1/8 w-[500px] h-[200px] bg-gradient-to-r from-pink-300 via-purple-300 to-yellow-300 rounded-full opacity-50 blur-2xl"></div>
                    <div className="relative container mx-auto text-center">
                        <h1 className="text-4xl py-6 font-lilita font-bold text-gray-800 mb-2">PANEL DE EMPLEADOS</h1>
                        <p className="text-gray-600 max-w-2xl text-center mx-auto leading-relaxed">
                            ¡Gestiona la información de los empleados de tu tienda! Aquí puedes agregar, editar y
                            eliminar empleados para mantener tu equipo actualizado.
                        </p>
                    </div>
                </header>
                <main className="container mx-auto">
                    <section className="relative bg-gray-100 py-10">
                        <div className="flex flex-col items-center">
                            <h1 className="text-3xl font-lilita font-bold mb-6 text-center">Gestionar Empleados</h1>
                            <form onSubmit={handleSubmit} className="mb-8 w-full max-w-4xl">
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="nombre"
                                        placeholder="Nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        className="border p-2 rounded"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="cargo"
                                        placeholder="Cargo"
                                        value={formData.cargo}
                                        onChange={handleChange}
                                        className="border p-2 rounded"
                                        required
                                    />
                                    <input
                                        type="number"
                                        name="salario"
                                        placeholder="Salario"
                                        value={formData.salario}
                                        onChange={handleChange}
                                        className="border p-2 rounded"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-pink-300 via-purple-300 to-yellow-300 text-white font-semibold px-8 py-3 mt-6 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out"
                                >
                                    {editId ? "Actualizar Empleado" : "Agregar Empleado"}
                                </button>
                            </form>
                        </div>
                    </section>

                    <section className="relative bg-gray-100 py-10">
                        <div className="flex flex-col items-center">
                            <h1 className="text-3xl font-lilita font-bold mb-6 text-center">Lista de Empleados</h1>
                            <table className="w-full max-w-4xl border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-gradient-to-r from-pink-300 via-purple-300 to-yellow-300 text-white">
                                        <th className="p-4 text-left">Nombre</th>
                                        <th className="p-4 text-left">Cargo</th>
                                        <th className="p-4 text-left">Salario</th>
                                        <th className="p-4 text-left">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {empleados
                                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                                        .map((empleado, index) => (
                                            <tr
                                                key={empleado._id}
                                                className={`text-gray-700 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                                    } hover:bg-gray-100 transition duration-300`}
                                            >
                                                <td className="p-4">{empleado.nombre}</td>
                                                <td className="p-4">{empleado.cargo}</td>
                                                <td className="p-4">{empleado.salario}</td>
                                                <td className="p-4">
                                                    <button
                                                        onClick={() => handleEdit(empleado)}
                                                        className="bg-yellow-500 text-white px-3 py-1 mr-2 rounded hover:bg-yellow-600 transition duration-300"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(empleado._id)}
                                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};

export default EmployeePanel;
