import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import PedidoPersonalizadoForm from "../../components/PedidoPersonalizadoForm";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCustomOrderForm, setShowCustomOrderForm] = useState(false);
  const apiBaseUrl = "http://localhost:4000/api";
  const clienteId = localStorage.getItem("clienteId");
  if (!clienteId) {
    console.error("No se encontró el cliente ID en localStorage.");
  }
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}/productos`);
      console.log("Productos recibidos:", res.data);
      setProducts(res.data);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    }
  };

  const fetchCart = async () => {
    const clienteId = localStorage.getItem("clienteId");
    if (!clienteId) {
      console.error("Usuario no autenticado.");
      alert("El cliente no está autenticado.");
      return;
    }

    try {
      const res = await axios.get(`${apiBaseUrl}/carrito/${clienteId}`);
      console.log("Carrito recibido:", res.data);
      setCart(res.data.productos || []);
    } catch (error) {
      console.error(
        "Error al cargar el carrito:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, [clienteId]);

  const handleCustomOrderClick = () => {
    setShowCustomOrderForm(true);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const handleAddToCart = async (product, quantity) => {
    const clienteId = localStorage.getItem("clienteId");
    if (!clienteId) {
      alert("El cliente no está autenticado.");
      return;
    }

    try {
      const prods = [];
      let prodExiste = false;

      if (cart) {
        cart.forEach((item) => {
          let itemId;

          if (item.producto_id._id) {
            itemId = item.producto_id._id;
          } else {
            itemId = item.producto_id;
          }

          if (String(itemId) === String(product._id)) {
            prodExiste = true;
            item.cantidad += quantity;
          }

          prods.push({
            producto_id: itemId,
            cantidad: item.cantidad,
            precio: item.precio,
          });
        });
      }

      if (!prodExiste) {
        prods.push({
          producto_id: product._id,
          cantidad: quantity,
          precio: product.precio,
        });
      }

      const payload = {
        cliente_id: clienteId,
        productos: prods,
      };

      const res = await axios.post(`${apiBaseUrl}/carrito/agregar`, payload);
      console.log("Carrito actualizado:", res.data);
      setCart(res.data.productos);
      await fetchProducts();
    } catch (error) {
      console.error(
        "Error al agregar al carrito:",
        error.response?.data || error.message
      );
    }
  };

  const handleRemoveFromCart = async (product) => {
    const clienteId = localStorage.getItem("clienteId");
    if (!clienteId) {
      alert("El cliente no está autenticado.");
      return;
    }

    try {
      const res = await axios.delete(
        `${apiBaseUrl}/carrito/${clienteId}/producto/${product}`
      );
      console.log("Producto eliminado del carrito:", res.data);
      setCart(res.data.productos);
      await fetchProducts();
    } catch (error) {
      console.error("Error al eliminar del carrito:", error);
    }
  };

  const handleEmptyCart = async () => {
    const clienteId = localStorage.getItem("clienteId");
    if (!clienteId) {
      alert("El cliente no está autenticado.");
      return;
    }

    try {
      await axios.delete(`${apiBaseUrl}/carrito/${clienteId}/vaciar`);
      setCart([]);
      console.log("Carrito vaciado.");
    } catch (error) {
      console.error("Error al vaciar el carrito:", error);
    }
  };

  async function completarPedido() {
    const clienteId = localStorage.getItem("clienteId");
    if (!clienteId) {
      alert("El cliente no está autenticado.");
      return;
    }

    if (!cart) {
      alert("El  carrito está vacio.");
      return;
    }

    const prods = [];
    let total = 0;

    cart.map((item) => {
      console.log(typeof item);
      const prod = {
        producto_id: item.producto_id,
        cantidad: item.cantidad,
        precio_unitario: item.precio,
      };

      total += item.cantidad * item.precio;

      prods.push(prod);
    });

    const payload = {
      cliente_id: clienteId,
      productos: prods,
      total: total,
    };

    try {
      const pedido = await axios.post(`${apiBaseUrl}/pedidos/crear`, payload);
      console.log(pedido);
      handleEmptyCart();
      navigate(`/pedido/${pedido.data.pedido._id}`);
    } catch (error) {
      console.error("Error al completar el pedido:", error);
    }
  }

  function renderAddToCart(product) {
    if (product.stock > 0) {
      return (
        <div className="flex items-center justify-center space-x-2 mt-auto">
          <input
            type="number"
            min="1"
            defaultValue="1"
            className="w-16 border rounded font-lilita p-1 text-center"
            id={`quantity-${product._id}`}
            max={product.stock}
          />
          <button
            onClick={() =>
              handleAddToCart(
                product,
                parseInt(
                  document.getElementById(`quantity-${product._id}`).value
                )
              )
            }
            className="bg-gradient-to-r from-pink-300 via-purple-300 to-yellow-300 text-white px-4 py-2 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-transform"
          >
            Agregar
          </button>
        </div>
      );
    }
  }

  return (
    <div className="bg-gray-100">
      <Navbar />
      <header className="relative bg-gray-100 overflow-hidden py-20">
        <div className="absolute top-[-100px] left-1/2 transform -translate-x-1/8 w-[500px] h-[200px] bg-gradient-to-r from-pink-300 via-purple-300 to-yellow-300 rounded-full opacity-50 blur-2xl"></div>
        <div className="relative container mx-auto text-center">
          <h1 className="text-4xl py-6 font-lilita font-bold text-gray-800 mb-2">
            Tienda
          </h1>
          <p className="text-gray-600 max-w-2xl text-center mx-auto leading-relaxed">
            Explora nuestros productos y construye tu carrito para la compra
            perfecta.
          </p>
        </div>
      </header>
      <main className="container mx-auto flex space-x-6 py-10">
        <section className="w-3/4">
          <h2 className="text-3xl font-lilita font-bold mb-6">Productos</h2>
          <div className="w-full max-w-4xl mb-6">
            <input
              type="text"
              placeholder="Buscar producto por nombre..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 gap-6">
            {products
              .filter((producto) =>
                producto.nombre
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
              .map((product) => (
                <div
                  key={product._id}
                  className="border rounded-lg shadow-lg bg-white hover:shadow-xl transition p-4 flex flex-col justify-between h-90"
                >
                  <img
                    src={product.imagen || "https://r2.fivemanage.com/kbqI3AHdhK2QGt3ZcWIHM/pngtree-cute-kawaii-kawaii-cookie-with-blue-eyes-and-a-smiling-face-vector-png-image_6913021.png"}
                    alt={product.nombre}
                    className="w-full h-50 object-cover rounded-t-lg mb-4"
                  />
                  <div>
                    <h3 className="text-lg font-bold mb-1 text-center">
                      {product.nombre}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 text-center truncate">
                      {product.descripcion}
                    </p>
                    <p className="text-gray-600 text-sm mb-2 text-center truncate">
                      Stock: {product.stock}
                    </p>
                    <p className="text-purple-700 font-semibold mb-4 text-center">
                      Precio: ₡{product.precio}
                    </p>
                  </div>
                  {renderAddToCart(product)}
                </div>
              ))}
          </div>
        </section>

        <aside className="w-1/4 bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg shadow-xl">
          <h2 className="text-3xl font-lilita font-bold mb-6">Carrito</h2>
          {cart.length > 0 ? (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.producto_id}
                  className="border-b pb-4 mb-4 flex items-center justify-between"
                >
                  <img
                    src={item.imagen || "https://r2.fivemanage.com/kbqI3AHdhK2QGt3ZcWIHM/pngtree-cute-kawaii-kawaii-cookie-with-blue-eyes-and-a-smiling-face-vector-png-image_6913021.png"}
                    alt={item.nombre}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1 ml-4">
                    <h3 className="font-bold text-sm">{item.nombre}</h3>
                    <p className="text-gray-600 text-sm">
                      Precio: ₡{item.precio}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Cantidad: {item.cantidad}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(item.producto_id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Quitar
                  </button>
                </div>
              ))}
              <div className="border-t pt-4">
                <h3 className="font-bold text-lg">
                  Total: ₡
                  {cart.reduce(
                    (acc, item) => acc + item.precio * item.cantidad,
                    0
                  )}
                </h3>
                <button
                  onClick={completarPedido}
                  className="bg-gradient-to-r from-pink-300 via-purple-300 to-yellow-300 text-white font-semibold w-full py-2 mt-4 rounded-full shadow-md hover:shadow-lg transition-transform"
                >
                  Finalizar compra
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 text-center">El carrito está vacío.</p>
          )}
          <button
            onClick={() => setShowCustomOrderForm(true)}
            className="bg-gradient-to-r from-pink-300 via-purple-300 to-yellow-300 text-white font-semibold w-full py-2 mt-4 rounded-full shadow-md hover:shadow-lg transition-transform"
          >
            Pedido Personalizado
          </button>
        </aside>
      </main>
      {showCustomOrderForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
            <PedidoPersonalizadoForm />
            <button
              onClick={() => setShowCustomOrderForm(false)}
              className="mt-4 text-red-500 hover:text-red-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
