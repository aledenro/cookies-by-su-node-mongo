import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import CarouselSection from "../components/CarouselSection";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";

const HomePage = () => {
    const navigate = useNavigate();

    const handleOrderClick = () => {
        navigate("/login");
    };

    return (
        <div className=" bg-gray-100 ">
            <Navbar />

            <header className="relative bg-gray-100 overflow-hidden py-20">
                <div className="absolute top-[-100px] left-1/2 transform -translate-x-1/8 w-[500px] h-[200px] bg-gradient-to-r from-pink-300 via-purple-300 to-yellow-300 rounded-full opacity-50 blur-2xl"></div>
                <div className="relative container mx-auto text-center">
                    <h1 className="text-4xl py-10 font-lilita font-bold text-gray-800 mb-4">Alguien dijo galletas?</h1>
                    <p className="text-gray-600 max-w-2xl text-center mx-auto leading-relaxed">
                        En Cookies by Su, transformamos simples galletas en obras de arte personalizadas, perfectas para sorprender en tus eventos,
                        regalos especiales o simplemente para darte un gustito único. Cada galleta es elaborada con amor, cuidado y dedicación,
                        diseñada especialmente para reflejar tus ideas y celebrar tus momentos más importantes.
                    </p>
                </div>
            </header>


            <main className="container mx-auto">
                <section className="relative bg-gray-100">
                    <div className="flex justify-center space-x-4 mb-8">
                        <div className="animate-bounce text-yellow-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m0 0l-6-6m6 6l6-6" />
                            </svg>
                        </div>
                        <div className="animate-bounce text-pink-500" style={{ animationDelay: "0.2s" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m0 0l-6-6m6 6l6-6" />
                            </svg>
                        </div>
                        <div className="animate-bounce text-blue-500" style={{ animationDelay: "0.4s" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m0 0l-6-6m6 6l6-6" />
                            </svg>
                        </div>
                    </div>

                    <div className="text-center ">
                        <button 
                        onClick={handleOrderClick}
                        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105">
                            ¡Ordene aquí!
                        </button>
                    </div>
                </section>

                <CarouselSection />
                <footer className="bg-gray-100 text-white-400 py-10">
                    <div className="container mx-auto text-center space-y-6">
                        <h2 className="text-2xl font-lilita font-bold">Síguenos en nuestras redes sociales</h2>

                        <div className="flex justify-center space-x-8">
                            <a
                                href="https://www.facebook.com/profile.php?id=100091903178022"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-4xl text-gray-800 hover:text-blue-500 transition-colors duration-300"
                            >
                                <FaFacebook />
                            </a>
                            <a
                                href="https://www.instagram.com/cookiesby_su?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-4xl text-gray-800 hover:text-pink-500 transition-colors duration-300"
                            >
                                <FaInstagram />
                            </a>
                        </div>

                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} Cookies by Su. Todos los derechos reservados.
                        </p>
                    </div>
                </footer>

            </main>
        </div>
    );
};

export default HomePage;
