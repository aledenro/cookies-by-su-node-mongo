const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware y rutas aquí
app.get('/', (req, res) => {
  res.send('Servidor corriendo correctamente');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
