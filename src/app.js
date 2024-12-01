const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
const descuentosRoutes = require("./routes/descuentosRoutes");

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

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
