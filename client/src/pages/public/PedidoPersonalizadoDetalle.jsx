import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";

const PedidoPersonalizadoDetalle = () => {
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);

  const fetchPedido = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/pedidosPersonalizados/${id}`);
      setPedido(res.data);
    } catch (error) {
      console.error("Error al obtener el pedido personalizado:", error);
    }
  };

  useEffect(() => {
    fetchPedido();
  }, [id]);

  if (!pedido) return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <p className="text-gray-700 text-lg">Cargando detalles del pedido...</p>
    </div>
  );

  return (
    <>
      <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen mt-15">
        <Navbar />
        <div className="container mx-auto py-20">
          <h1 className="text-5xl font-extrabold text-center mb-8 text-purple-700">Detalle del Pedido Personalizado</h1>
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-lg mb-2">
                  <span className="font-bold text-purple-600">ID del Pedido:</span> {pedido._id}
                </p>
                <p className="text-lg mb-2">
                  <span className="font-bold text-purple-600">Correo Electrónico:</span> {pedido.correo_electronico}
                </p>
                <p className="text-lg mb-2">
                  <span className="font-bold text-purple-600">descripcion:</span> {pedido.descripcion}
                </p>
                <p className="text-lg mb-2">
                  <span className="font-bold text-purple-600">Teléfono:</span> {pedido.telefono_celular}
                </p>
                <p className="text-lg mb-2">
                  <span className="font-bold text-purple-600">Fecha de Entrega:</span> {new Date(pedido.fecha_entrega).toLocaleDateString()}
                </p>
                <p className="text-lg mb-2">
                  <span className="font-bold text-purple-600">Estado:</span> {pedido.estado || "Pendiente"}
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-purple-600 mb-4">Imágenes</h3>
                <div className="grid grid-cols-2 gap-4">
                  {pedido.imagenes.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Imagen ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={() => window.history.back()}
              className="bg-gradient-to-r from-pink-300 via-purple-300 to-yellow-300 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:scale-105 transition-transform"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PedidoPersonalizadoDetalle;
