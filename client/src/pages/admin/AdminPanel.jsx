import React from "react";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/authContext";
import StatisticsCards from "../../components/StatisticsCards";
import AdminCards from "../../components/AdminCards";

const AdminPanel = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="bg-gray-100">
        <Navbar />
        <header className="relative bg-gray-100 overflow-hidden py-20">
          <div className="absolute top-[-100px] left-1/2 transform -translate-x-1/8 w-[500px] h-[200px] bg-gradient-to-r from-pink-300 via-purple-300 to-yellow-300 rounded-full opacity-50 blur-2xl"></div>
          <div className="relative container mx-auto text-center">
            <h1 className="text-4xl py-6 font-lilita font-bold text-gray-800 mb-2">ADMINISTRACIÓN</h1>
            <p className="text-gray-600 max-w-2xl text-center mx-auto leading-relaxed">
              ¡Hola, {user?.nombre || "Admin"}! Bienvenida a tu panel administrativo. Aquí puedes gestionar y
              monitorear cada detalle de tu emprendimiento para seguir creciendo y endulzando
              momentos especiales.
            </p>
          </div>
        </header>
        <main className="container mx-auto">
          <section className="relative bg-gray-100 py-10">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl font-lilita font-bold mb-4">Estadísticas</h1>
              <StatisticsCards />
            </div>
          </section>

          <section className="relative bg-gray-100 py-10">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl font-lilita font-bold mb-4">Manejo</h1>
              <AdminCards />
            </div>
          </section>
        </main>

      </div>
    </>
  );
};


export default AdminPanel;
