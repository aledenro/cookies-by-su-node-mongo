import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

const PedidosPanel = () => {
  const navigate = useNavigate();

  const [pedidos, setPedidos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(pedidos.length / itemsPerPage);

  const apiBaseUrl = "http://localhost:4000/api/pedidos/";

  const fetchPedidos = async () => {
    try {
      const res = await axios.get(apiBaseUrl);
      console.log(res.data);
      setPedidos(res.data);
    } catch (error) {
      console.error("Error al cargar pedidos:", error);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiBaseUrl}/${id}`);
      setPedidos(pedidos.filter((ped) => ped._id !== id));
    } catch (error) {
      console.error("Error al eliminar pedido:", error);
    }
  };

  const handleVerDetalle = async (id) => {
    navigate(`/pedido/${id}`);
  };

  const formatDate = (dateStr) => {
    var date = new Date(dateStr);

    return date.toLocaleDateString();
  };

  return (
    <>
      <div className="bg-gray-100">
        <Navbar />
        <header className="relative bg-gray-100 overflow-hidden py-20">
          <div className="absolute top-[-100px] left-1/2 transform -translate-x-1/8 w-[500px] h-[200px] bg-gradient-to-r from-pink-300 via-purple-300 to-yellow-300 rounded-full opacity-50 blur-2xl"></div>
          <div className="relative container mx-auto text-center">
            <h1 className="text-4xl py-6 font-lilita font-bold text-gray-800 mb-2">
              PANEL DE PEDIDOS
            </h1>
            <p className="text-gray-600 max-w-2xl text-center mx-auto leading-relaxed">
              ¡Revisa los pedidos que han realizado!
            </p>
          </div>
        </header>
        <main className="container mx-auto">
          <section className="relative bg-gray-100 py-10">
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-lilita font-bold mb-6 text-center">
                Lista de Pedidos
              </h1>
              <table className="w-full max-w-4xl border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-pink-300 via-purple-300 to-yellow-300 text-white">
                    <th className="p-4 text-left"># Pedido</th>
                    <th className="p-4 text-left">Nombre Cliente</th>
                    <th className="p-4 text-left">Email</th>
                    <th className="p-4 text-left">Fecha De Compra</th>
                    <th className="p-4 text-left">Total</th>
                    <th className="p-4 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((pedido, index) => (
                      <tr
                        key={pedido._id}
                        className={`text-gray-700 ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-gray-100 transition duration-300`}
                      >
                        <td className="p-4">{pedido._id}</td>
                        <td className="p-4">{pedido.cliente_id.nombre}</td>
                        <td className="p-4">{pedido.cliente_id.email}</td>
                        <td className="p-4">
                          {formatDate(pedido.fecha_pedido)}
                        </td>
                        <td className="p-4">₡{pedido.total.toFixed(2)}</td>
                        <td className="p-4">
                          <button
                            onClick={() => handleVerDetalle(pedido._id)}
                            className="bg-blue-500 text-white px-3 py-1 mr-2 m-1 rounded bg-yellow-400 hover:bg-yellow-600 transition duration-300"
                          >
                            Ver Detalle
                          </button>
                          <button
                            onClick={() => handleDelete(pedido._id)}
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

export default PedidosPanel;
