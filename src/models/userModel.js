const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    nombre: { type: String },
    email: { type: String },
    telefono: { type: String },
    direccion: {
      calle: { type: String },
      ciudad: { type: String },
      codigo_postal: { type: String },
    },
    historial_compras: [{ type: mongoose.Schema.Types.Mixed }],
    roles: [{ type: String }],
    password: { type: String },
    fecha_registro: { type: Date },
  },
  { collection: "Users" }
);

module.exports = new mongoose.model("Users", User);
