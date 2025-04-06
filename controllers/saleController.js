const { Sale, SaleDetail, Client, Product } = require('../models');
const { generarFactura } = require('../utils/pdfGenerator');

exports.create = async (req, res) => {
  try {
    const { clienteId, productos } = req.body;

    let total = 0;
    for (const p of productos) {
      const prod = await Product.findByPk(p.productoId);
      if (!prod || prod.stock < p.cantidad) {
        return res.status(400).json({ message: `Stock insuficiente de ${prod?.nombre}` });
      }
      total += prod.precio * p.cantidad;
    }

    const venta = await Sale.create({
      total,
      ClientId: clienteId,
      UserId: req.user.id,
    });

    const detalles = [];
    for (const p of productos) {
      const prod = await Product.findByPk(p.productoId);
      await prod.update({ stock: prod.stock - p.cantidad });

      const detalle = await SaleDetail.create({
        SaleId: venta.id,
        ProductId: p.productoId,
        cantidad: p.cantidad,
        subtotal: prod.precio * p.cantidad,
      });

      detalles.push({ ...detalle.toJSON(), Producto: prod });
    }

    const cliente = await Client.findByPk(clienteId);
    generarFactura(venta, detalles, cliente, (path) => {
      res.json({ venta, detalles, factura: path });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar la venta', error });
  }
};

exports.getAll = async (req, res) => {
  const ventas = await Sale.findAll({ include: [Client] });
  res.json(ventas);
};
