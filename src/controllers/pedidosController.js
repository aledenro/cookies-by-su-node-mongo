const Pedido = require("../models/pedidosModel");
const Producto = require("../models/productosModel");
const estadisticasVentasService = require("../services/estadisticasVentasService");

const crearPedido = async (req, res) => {
  try {
    const { cliente_id, productos, total } = req.body;

    console.log(req.body, "body");

    if (!cliente_id || !productos || productos.length === 0 || !total) {
      return res
        .status(400)
        .json({ error: "Faltan datos requeridos para crear el pedido." });
    }

    const nuevoPedido = new Pedido({
      cliente_id,
      productos,
      total,
    });

    await nuevoPedido.save();

    for (const producto of productos) {
      const productoDB = await Producto.findById(producto.producto_id);
      if (!productoDB) {
        return res.status(404).json({
          error: `Producto con ID ${producto.producto_id} no encontrado.`,
        });
      }

      // if (productoDB.stock < producto.cantidad) {
      //   return res.status(400).json({
      //     error: `Stock insuficiente para el producto ${productoDB.nombre}.`,
      //   });
      // }

      productoDB.stock -= producto.cantidad;
      await productoDB.save();

      await estadisticasVentasService.registrarVenta(
        producto.producto_id,
        producto.cantidad,
        producto.precio_unitario,
        new Date().toLocaleString("default", { month: "long" }),
        new Date().getFullYear()
      );
    }

    res.status(201).json({
      message: "Pedido creado exitosamente y estadísticas actualizadas",
      pedido: nuevoPedido,
    });
  } catch (error) {
    console.error("Error al crear el pedido:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate("cliente_id")
      .populate("productos.producto_id");
    res.status(200).json(pedidos);
  } catch (error) {
    console.error("Error al obtener los pedidos:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const obtenerPedidoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const pedido = await Pedido.findById(id)
      .populate("cliente_id")
      .populate("productos.producto_id");
    if (!pedido) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    res.status(200).json(pedido);
  } catch (error) {
    console.error("Error al obtener el pedido por ID:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const eliminarPedido = async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await Pedido.findByIdAndDelete(id);
    if (!resultado) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    res.status(200).json({ message: "Pedido eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar el pedido:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  crearPedido,
  obtenerPedidos,
  obtenerPedidoPorId,
  eliminarPedido,
};
