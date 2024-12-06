import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

const ProductPanel = () => {
    const [productos, setProductos] = useState([]);
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        categoria: "",
        precio: "",
        stock: "",
        estado: "Activo",
    });
    const [currentPage, setCurrentPage] = useState(1); 
    const itemsPerPage = 5; 
    const totalPages = Math.ceil(productos.length / itemsPerPage); 

    const [editId, setEditId] = useState(null);

    const apiBaseUrl = "http://localhost:4000/api/productos";

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const res = await axios.get(apiBaseUrl);
                setProductos(res.data);
            } catch (error) {
                console.error("Error al cargar productos:", error);
            }
        };

        fetchProductos();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editId) {
                await axios.put(`${apiBaseUrl}/actualizar/${editId}`, formData);
                setProductos((prev) =>
                    prev.map((prod) =>
                        prod._id === editId ? { ...prod, ...formData } : prod
                    )
                );
            } else {
                const res = await axios.post(`${apiBaseUrl}/agregarProducto`, formData);
                setProductos([...productos, res.data]);
            }

            setFormData({
                nombre: "",
                descripcion: "",
                categoria: "",
                precio: "",
                stock: "",
                estado: "Activo",
            });
            setEditId(null);
        } catch (error) {
            console.error("Error al guardar producto:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiBaseUrl}/eliminar/${id}`);
            setProductos(productos.filter((prod) => prod._id !== id));
        } catch (error) {
            console.error("Error al eliminar producto:", error);
        }
    };

    const handleEdit = (producto) => {
        setEditId(producto._id);
        setFormData({
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            categoria: producto.categoria,
            precio: producto.precio,
            stock: producto.stock,
            estado: producto.estado,
        });
    };

    return (
        <>
            <div className="bg-gray-100">
                <Navbar />
                <header className="relative bg-gray-100 overflow-hidden py-20">
                    <div className="absolute top-[-100px] left-1/2 transform -translate-x-1/8 w-[500px] h-[200px] bg-gradient-to-r from-pink-300 via-purple-300 to-yellow-300 rounded-full opacity-50 blur-2xl"></div>
                    <div className="relative container mx-auto text-center">
                        <h1 className="text-4xl py-6 font-lilita font-bold text-gray-800 mb-2">PANEL DE PRODUCTOS</h1>
                        <p className="text-gray-600 max-w-2xl text-center mx-auto leading-relaxed">
                            ¡Administra los productos de tu tienda! Aquí puedes agregar, editar, eliminar y mantener actualizados los detalles de tu inventario.
                        </p>
                    </div>
                </header>
                <main className="container mx-auto">
                    <section className="relative bg-gray-100 py-10">
                        <div className="flex flex-col items-center">
                            <h1 className="text-3xl font-lilita font-bold mb-6 text-center">Gestionar Productos</h1>
                            <form onSubmit={handleSubmit} className="mb-8 w-full max-w-4xl">
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="nombre"
                                        placeholder="Nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        className="border p-2"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="categoria"
                                        placeholder="Categoría"
                                        value={formData.categoria}
                                        onChange={handleChange}
                                        className="border p-2"
                                        required
                                    />
                                    <textarea
                                        name="descripcion"
                                        placeholder="Descripción"
                                        value={formData.descripcion}
                                        onChange={handleChange}
                                        className="border p-2"
                                        required
                                    />
                                    <input
                                        type="number"
                                        name="precio"
                                        placeholder="Precio"
                                        value={formData.precio}
                                        onChange={handleChange}
                                        className="border p-2"
                                        required
                                    />
                                    <input
                                        type="number"
                                        name="stock"
                                        placeholder="Stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        className="border p-2"
                                        required
                                    />
                                    <select
                                        name="estado"
                                        value={formData.estado}
                                        onChange={handleChange}
                                        className="border p-2"
                                    >
                                        <option value="Activo">Activo</option>
                                        <option value="Descontinuado">Descontinuado</option>
                                        <option value="Agotado">Agotado</option>
                                    </select>
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="upload-images"
                                            className="flex items-center justify-center bg-gradient-to-r from-pink-300 via-purple-300 to-yellow-300 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out cursor-pointer"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                                stroke="currentColor"
                                                className="w-5 h-5 mr-2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 16v-4m0 0v-4m0 4h4m-4 0H8m12-4h.01M6 20h12a2 2 0 002-2V8a2 2 0 00-2-2h-2.586a1 1 0 01-.707-.293l-2.414-2.414a1 1 0 00-.707-.293H10a1 1 0 00-.707.293L6.879 5.707A1 1 0 016.172 6H6a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                />
                                            </svg>
                                            Subir Imágenes
                                        </label>
                                        <input
                                            id="upload-images"
                                            type="file"
                                            name="imagenes"
                                            accept="image/*"
                                            multiple
                                            onChange={(e) => {
                                                const files = Array.from(e.target.files).map((file) =>
                                                    URL.createObjectURL(file)
                                                );
                                                setFormData({ ...formData, imagenes: files });
                                            }}
                                            className="hidden"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-pink-300 via-purple-300 to-yellow-300 text-white font-semibold px-8 py-3 mt-6 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out"
                                >
                                    {editId ? "Actualizar Producto" : "Agregar Producto"}
                                </button>

                            </form>
                        </div>
                    </section>


                    <section className="relative bg-gray-100 py-10">
                        <div className="flex flex-col items-center">
                            <h1 className="text-3xl font-lilita font-bold mb-6 text-center">Lista de Productos</h1>
                            <table className="w-full max-w-4xl border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-gradient-to-r from-pink-300 via-purple-300 to-yellow-300 text-white">
                                        <th className="p-4 text-left">Nombre</th>
                                        <th className="p-4 text-left">Categoría</th>
                                        <th className="p-4 text-left">Precio</th>
                                        <th className="p-4 text-left">Stock</th>
                                        <th className="p-4 text-left">Estado</th>
                                        <th className="p-4 text-left">Imágenes</th>
                                        <th className="p-4 text-left">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos
                                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                                        .map((producto, index) => (
                                            <tr
                                                key={producto._id}
                                                className={`text-gray-700 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                                    } hover:bg-gray-100 transition duration-300`}
                                            >
                                                <td className="p-4">{producto.nombre}</td>
                                                <td className="p-4">{producto.categoria}</td>
                                                <td className="p-4">${producto.precio.toFixed(2)}</td>
                                                <td className="p-4">{producto.stock}</td>
                                                <td className="p-4">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${producto.estado === "Activo"
                                                            ? "bg-green-200 text-green-800"
                                                            : producto.estado === "Descontinuado"
                                                                ? "bg-yellow-200 text-yellow-800"
                                                                : "bg-red-200 text-red-800"
                                                            }`}
                                                    >
                                                        {producto.estado}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex gap-2">
                                                        {producto.imagenes?.map((img, index) => (
                                                            <img
                                                                key={index}
                                                                src={img}
                                                                alt={`Imagen de ${producto.nombre}`}
                                                                className="w-16 h-16 object-cover rounded-md border border-gray-300"
                                                            />
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <button
                                                        onClick={() => handleEdit(producto)}
                                                        className="bg-yellow-500 text-white px-3 py-1 mr-2 rounded hover:bg-yellow-600 transition duration-300"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(producto._id)}
                                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            <div className="flex justify-center mt-6">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    className={`px-4 py-2 mx-1 rounded-lg ${currentPage === 1
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                                        }`}
                                >
                                    Anterior
                                </button>
                                <span className="px-4 py-2 mx-1">{currentPage}</span>
                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    className={`px-4 py-2 mx-1 rounded-lg ${currentPage === totalPages
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                                        }`}
                                >
                                    Siguiente
                                </button>
                            </div>
                        </div>
                    </section>

                </main>
            </div>
        </>
    );
};

export default ProductPanel;
