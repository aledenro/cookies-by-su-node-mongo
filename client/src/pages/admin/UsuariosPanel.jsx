import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

const UsuariosPanel = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(usuarios.length / itemsPerPage);

  const apiBaseUrl = "http://localhost:4000/api/users/";

  const fetchUsuarios = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(apiBaseUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data.users);
      setUsuarios(res.data.users);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleAdmin = async (id, roles) => {
    try {
      const token = localStorage.getItem("token");

      if (roles.includes("Admin")) {
        const index = roles.indexOf("Admin");
        roles.splice(index, 1);
      } else {
        roles.push("Admin");
      }

      await axios.put(
        `${apiBaseUrl}updateRoles/${id}`,
        { roles: roles },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchUsuarios();
    } catch (error) {
      console.error("Error al cambiar usuario:", error);
    }
  };

  const handleCambiarEstado = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${apiBaseUrl}changeEstado/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchUsuarios();
    } catch (error) {
      console.error("Error al cambiar estado del usuario:", error);
    }
  };

  const formatDate = (dateStr) => {
    var date = new Date(dateStr);

    return date.toLocaleDateString();
  };

  const renderRoles = (roles) => {
    return roles.slice(0, 2).map((rol, index) => (
      <span
        key={index}
        className="inline-block px-3 py-1 mr-2 mb-2 rounded-full text-sm font-semibold bg-blue-200 text-blue-800"
      >
        {rol}
      </span>
    ));
  };

  const dynamicTextRoles = (roles) => {
    if (roles.includes("Admin")) {
      return "Quitar Rol Administrador";
    } else {
      return "Hacer Administrador";
    }
  };

  return (
    <>
      <div className="bg-gray-100">
        <Navbar />
        <header className="relative bg-gray-100 overflow-hidden py-20">
          <div className="absolute top-[-100px] left-1/2 transform -translate-x-1/8 w-[500px] h-[200px] bg-gradient-to-r from-pink-300 via-purple-300 to-yellow-300 rounded-full opacity-50 blur-2xl"></div>
          <div className="relative container mx-auto text-center">
            <h1 className="text-4xl py-6 font-lilita font-bold text-gray-800 mb-2">
              PANEL DE USUARIOS
            </h1>
            <p className="text-gray-600 max-w-2xl text-center mx-auto leading-relaxed">
              ¡Gestiona los usuarios de tu website y cambia los roles!
            </p>
          </div>
        </header>
        <main className="container mx-auto">
          <section className="relative bg-gray-100 py-10">
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-lilita font-bold mb-6 text-center">
                Lista de Usuarios
              </h1>
              <table className="w-full max-w-4xl border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-pink-300 via-purple-300 to-yellow-300 text-white">
                    <th className="p-4 text-left">Nombre</th>
                    <th className="p-4 text-left">Email</th>
                    <th className="p-4 text-left">Fecha De Registro</th>
                    <th className="p-4 text-left">Roles</th>
                    <th className="p-4 text-left">Estado</th>
                    <th className="p-4 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((usuario, index) => (
                      <tr
                        key={usuario._id}
                        className={`text-gray-700 ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-gray-100 transition duration-300`}
                      >
                        <td className="p-4">{usuario.nombre}</td>
                        <td className="p-4">{usuario.email}</td>
                        <td className="p-4">
                          {formatDate(usuario.fecha_registro)}
                        </td>
                        <td className="p-4">{renderRoles(usuario.roles)}</td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              usuario.estado === true
                                ? "bg-green-200 text-green-800"
                                : "bg-red-200 text-red-800"
                            }`}
                          >
                            {usuario.estado === true ? "Activo" : "Inactivo"}
                          </span>
                        </td>

                        <td className="p-4">
                          <button
                            onClick={() =>
                              handleAdmin(usuario._id, usuario.roles)
                            }
                            className="bg-blue-500 text-white px-3 py-1 mr-2 rounded hover:bg-yellow-600 transition duration-300"
                          >
                            {dynamicTextRoles(usuario.roles)}
                          </button>
                          <button
                            onClick={() => handleCambiarEstado(usuario._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                          >
                            Cambiar Estado
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
                  className={`px-4 py-2 mx-1 rounded-lg ${
                    currentPage === 1
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
                  className={`px-4 py-2 mx-1 rounded-lg ${
                    currentPage === totalPages
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

export default UsuariosPanel;
