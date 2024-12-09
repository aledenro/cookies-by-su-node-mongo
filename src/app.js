require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
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
const pedidosRoutes = require("./routes/pedidosRoutes");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const cors = require("cors");
const { auth, checkRole } = require("./middlewares/authMiddleware");



// Middleware y rutas aquí
app.get("/", (req, res) => {
  res.send("Servidor corriendo correctamente");
});

// Rutas protegidas
app.use("/api/protected", auth, (req, res) => {
  res.json({ message: "Bienvenido a la ruta protegida" });
});

// Rutas específicas para roles de administrador
app.use("/api/admin", auth, checkRole("Admin"), (req, res) => {
  res.json({ message: "Bienvenido al panel de administración" });
});

connectDB();

// Configurar CORS
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);

// Middleware para parsear JSON
app.use(express.json());

// Middleware para procesar datos codificados en URL
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/", userRoutes);
app.use("/api/descuentos/", descuentosRoutes);
app.use("/api/pedidosPersonalizados", pedidosPersonalizadosRoutes);
app.use("/api/envios", enviosRoutes);
app.use("/api/pagos", pagosRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/carrito", carritoRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/productos-recomendados", productosRecomendadosRoutes);
app.use("/api/estadisticas-ventas", estadisticasVentasRoutes);
app.use("/api/empleados", empleadosRoutes);
app.use("/api/productos-descatalogados", productosDescatalogadosRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/pedidos", pedidosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
