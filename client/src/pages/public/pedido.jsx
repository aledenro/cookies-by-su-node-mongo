import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import _ from "lodash";

const PedidoDetail = () => {
  const { pedidoId } = useParams();
  const apiBaseUrl = "http://localhost:4000/api";
  const clienteId = localStorage.getItem("clienteId");
  const [pedido, setPedido] = useState(null);

  if (!clienteId) {
    console.error("No se encontró el cliente ID en localStorage.");
  }

  async function fetchPedido(pedidoId) {
    const response = await axios.get(`${apiBaseUrl}/pedidos/${pedidoId}`);
    console.log("Pedido:", response.data);
    setPedido(response.data || null);
  }

  useEffect(() => {
    fetchPedido(pedidoId);
  }, [clienteId, pedidoId]);

  if (!pedido) {
    return (
      <div className="pt-10 bg-gray-100">
        <Navbar />
        <main className="container mx-auto py-10 px-6 text-center">
          <p className="text-gray-600 text-xl">Cargando pedido...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="pt-10 bg-gray-100">
      <Navbar />
      <main className="container mx-auto py-10 px-6">
        <section className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg shadow-xl">
          {pedido ? (
            <div className="space-y-4">
              <h1 className="text-4xl py-6 font-lilita font-bold text-gray-800 mb-2">
                Pedido: {pedido._id}
              </h1>
              {pedido.productos.map((item) => (
                <div
                  key={item.producto_id._id}
                  className="border-b pb-4 mb-4 flex items-center justify-between"
                >
                  <img
                    src={
                      item.producto_id.imagenes[0] ||
                      "https://via.placeholder.com/150"
                    }
                    alt={item.producto_id.nombre}
                    className="w-1/4 h-50 object-cover rounded-t-lg mb-4"
                  />
                  <div className="flex-1 ml-4">
                    <h3 className="font-bold text-sm">
                      {item.producto_id.nombre}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Precio: ₡{item.producto_id.precio}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Cantidad: {item.cantidad}
                    </p>
                  </div>
                </div>
              ))}
              <div className="border-t pt-4">
                <h3 className="font-bold text-lg">Total: ₡{pedido.total}</h3>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 text-center">
              No se pudo obtener la orden.
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

export default PedidoDetail;
