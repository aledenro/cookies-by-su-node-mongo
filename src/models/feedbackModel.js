const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
    {
        producto_id: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
        cliente_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        valoracion: { 
            type: Number, 
            required: true, 
            min: 1, 
            max: 5,
        },
        comentarios: { type: String, required: false },
        fecha_feedback: { type: Date, default: Date.now }, 
    },
    { collection: "feedback" }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);
