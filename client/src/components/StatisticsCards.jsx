import React, { useEffect, useState } from "react";
import axios from "axios";

const StatisticsCards = () => {
  const [stats, setStats] = useState({
    totalPrecioVendido: 0,
    totalProductosVendidos: 0,
    totalUsuarios: 0,
  });

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/estadisticas-ventas/generales"
      );
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error.message);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-lg font-bold text-gray-700 mb-2">
            Ventas Totales
          </h3>
          <p className="text-2xl font-semibold text-blue-500">
            ₡{stats.totalPrecioVendido.toLocaleString()}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-lg font-bold text-gray-700 mb-2">
            Productos Vendidos
          </h3>
          <p className="text-2xl font-semibold text-green-500">
            {stats.totalProductosVendidos.toLocaleString()}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-lg font-bold text-gray-700 mb-2">
            Usuarios Registrados
          </h3>
          <p className="text-2xl font-semibold text-pink-500">
            {stats.totalUsuarios.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCards;
