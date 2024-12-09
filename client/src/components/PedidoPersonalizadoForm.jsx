import React, { useState } from "react";
import axios from "axios";

const PedidoPersonalizadoForm = () => {
  const [formData, setFormData] = useState({
    descripcion: "",
    cantidad: 1,
    imagenes: [],
    correo_electronico: "",
    telefono_celular: "",
    fecha_entrega: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileUrls = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({ ...prev, imagenes: [...prev.imagenes, ...fileUrls] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    try {
      const payload = { ...formData, cantidad: parseInt(formData.cantidad) };
      const response = await axios.post(
        "http://localhost:4000/api/pedidosPersonalizados/agregar",
        payload
      );
      alert("Pedido personalizado enviado con éxito");
      console.log("Respuesta:", response.data);
      setFormData({
        descripcion: "",
        cantidad: 1,
        imagenes: [],
        correo_electronico: "",
        telefono_celular: "",
        fecha_entrega: "",
      });
    } catch (error) {
      console.error("Error al enviar el pedido:", error.response?.data || error.message);
      alert("Error al enviar el pedido");
    } finally {
      setLoading(false);
    }
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 4);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Pedido Personalizado</h2>
      <form onSubmit={handleSubmit}> 
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Descripción:</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            maxLength="500"
            required
            className="w-full border rounded p-2"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Cantidad:</label>
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            min="1"
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Subir Imágenes:</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="w-full border rounded p-2"
          />
          <div className="mt-2 flex gap-2">
            {formData.imagenes.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Preview"
                className="w-16 h-16 object-cover rounded"
              />
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Correo Electrónico:</label>
          <input
            type="email"
            name="correo_electronico"
            value={formData.correo_electronico}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Teléfono Celular:</label>
          <input
            type="text"
            name="telefono_celular"
            value={formData.telefono_celular}
            onChange={handleChange}
            required
            pattern="\d{8}"
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Fecha de Entrega:</label>
          <input
            type="date"
            name="fecha_entrega"
            value={formData.fecha_entrega}
            onChange={handleChange}
            min={minDate.toISOString().split("T")[0]}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-2 px-4 rounded hover:opacity-90 transition"
        >
          {loading ? "Enviando..." : "Enviar Pedido"}
        </button>
      </form>
    </div>
  );
};

export default PedidoPersonalizadoForm;
