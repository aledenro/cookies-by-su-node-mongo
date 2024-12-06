const Carrito = require("../models/carritoModel");
const Producto = require("../models/productosModel");
const EstadisticasVentas = require("../models/estadisticasVentasModel");

const agregarAlCarrito = async (cliente_id, productos) => {
    try {
        let total = 0;

        for (const item of productos) {
            const producto = await Producto.findById(item.producto_id);
            if (!producto) {
                throw new Error(`El producto con ID ${item.producto_id} no existe.`);
            }
            if (item.cantidad > producto.stock) {
                throw new Error(`El stock disponible para el producto ${producto.nombre} es insuficiente.`);
            }

            producto.stock -= item.cantidad;
            await producto.save();

            total += producto.precio * item.cantidad;

            const estadistica = await EstadisticasVentas.findOne({
                producto_id: producto._id,
                mes: new Date().toLocaleString("default", { month: "long" }),
                anio: new Date().getFullYear(),
            });

            if (estadistica) {
                estadistica.ventas += item.cantidad;
                estadistica.ingresos_totales += producto.precio * item.cantidad;
                await estadistica.save();
            } else {
                await EstadisticasVentas.create({
                    producto_id: producto._id,
                    ventas: item.cantidad,
                    ingresos_totales: producto.precio * item.cantidad,
                    mes: new Date().toLocaleString("default", { month: "long" }),
                    anio: new Date().getFullYear(),
                });
            }
        }

        const nuevoCarrito = new Carrito({
            cliente_id,
            productos,
            total,
        });

        return await nuevoCarrito.save();
    } catch (error) {
        console.error("Error al agregar al carrito:", error.message);
        throw error;
    }
};

const obtenerCarrito = async (cliente_id) => {
    return await Carrito.findOne({ cliente_id }).populate("productos.producto_id");
  };
  


const eliminarProductoDelCarrito = async (cliente_id, producto_id) => {
    try {
        const carrito = await Carrito.findOne({ cliente_id });
        if (!carrito) throw new Error("Carrito no encontrado.");

        const productoIndex = carrito.productos.findIndex((item) => item.producto_id.toString() === producto_id);
        if (productoIndex === -1) throw new Error("Producto no encontrado en el carrito.");

        const producto = await Producto.findById(producto_id);
        if (producto) {
            producto.stock += carrito.productos[productoIndex].cantidad;
            await producto.save();
        }

        carrito.productos.splice(productoIndex, 1);
        carrito.total = carrito.productos.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

        return await carrito.save();
    } catch (error) {
        console.error("Error al eliminar el producto del carrito:", error.message);
        throw error;
    }
};

const vaciarCarrito = async (cliente_id) => {
    try {
        const carrito = await Carrito.findOne({ cliente_id });
        if (!carrito) throw new Error("Carrito no encontrado.");

        for (const item of carrito.productos) {
            const producto = await Producto.findById(item.producto_id);
            if (producto) {
                producto.stock += item.cantidad;
                await producto.save();
            }
        }

        return await Carrito.findOneAndDelete({ cliente_id });
    } catch (error) {
        console.error("Error al vaciar el carrito:", error.message);
        throw error;
    }
};

module.exports = {
    agregarAlCarrito,
    obtenerCarrito,
    eliminarProductoDelCarrito,
    vaciarCarrito,
};
