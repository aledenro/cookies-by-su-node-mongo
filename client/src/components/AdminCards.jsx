import React from "react";
import { useNavigate } from "react-router-dom";

const AdminCards = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-lilita font-bold mb-4">Agregar Producto</h2>
        <p className="text-gray-600 mb-6">
          Añade nuevos productos al inventario y mantén actualizado el catálogo de tu tienda.
        </p>
        <button
          onClick={() => handleNavigation("/productos-panel")}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Ir al panel de productos
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-lilita font-bold mb-4">Agregar Empleados</h2>
        <p className="text-gray-600 mb-6">
          Gestiona a los empleados de tu negocio y organiza roles administrativos.
        </p>
        <button
          onClick={() => handleNavigation("/empleados-panel")}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Ir al panel de empleados
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-lilita font-bold mb-4">Manejar Pedidos</h2>
        <p className="text-gray-600 mb-6">
          Observa y controla los pedidos realizados por los clientes.
        </p>
        <button
          onClick={() => handleNavigation("/pedidos-panel")}
          className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition duration-300"
        >
          Ir al panel de pedidos
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-lilita font-bold mb-4">Pedidos Personalizados</h2>
        <p className="text-gray-600 mb-6">
          Administra y realiza seguimientos de los pedidos personalizados de los clientes.
        </p>
        <button
          onClick={() => handleNavigation("/pedidos-personalizados-panel")}
          className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
        >
          Ir al panel de pedidos personalizados
        </button>
      </div>
    </div>
  );
};

export default AdminCards;
