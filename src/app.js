const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
const descuentosRoutes = require("./routes/descuentosRoutes");
const pedidosPersonalizadosRoutes = require("./routes/pedidosPersonalizadosRoutes");
const enviosRoutes = require("./routes/enviosRoutes");
const pagosRoutes = require("./routes/pagosRoutes");
const productosRoutes = require("./routes/productosRoutes");
const carritoRoutes = require("./routes/carritoRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const productosRecomendadosRoutes = require("./routes/productosRecomendadosRoutes");
const estadisticasVentasRoutes = require("./routes/estadisticasVentasRoutes");
const empleadosRoutes = require("./routes/empleadosRoutes");
const productosDescatalogadosRoutes = require("./routes/productosDescatalogadosRoutes");

// Middleware y rutas aquí
app.get("/", (req, res) => {
  res.send("Servidor corriendo correctamente");
});

connectDB();

// Middleware para parsear JSON
app.use(express.json());

// Middleware para procesar datos codificados en URL
app.use(express.urlencoded({ extended: true }));

app.use("/api/", userRoutes);
app.use("/api/descuentos/", descuentosRoutes);
app.use("/api/pedidos-personalizados", pedidosPersonalizadosRoutes);
app.use("/api/envios", enviosRoutes);
app.use("/api/pagos", pagosRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/carrito", carritoRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/productos-recomendados", productosRecomendadosRoutes);
app.use("/api/estadisticas-ventas", estadisticasVentasRoutes);
app.use("/api/empleados", empleadosRoutes);
app.use("/api/productos-descatalogados", productosDescatalogadosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
