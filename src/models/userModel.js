const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefono: { type: String },
    direccion: {
      calle: { type: String },
      ciudad: { type: String },
      codigo_postal: { type: String },
    },
    historial_compras: [{ type: mongoose.Schema.Types.Mixed }],
    roles: {
      type: [String],
      enum: ["User", "Admin"],
      default: ["User"],
    },
    password: { type: String, required: true },
    fecha_registro: { type: Date, default: Date.now },
    estado: { type: Boolean, default: true },
  },
  { collection: "Users" }
);

module.exports = mongoose.models.Users || mongoose.model("Users", UserSchema);
