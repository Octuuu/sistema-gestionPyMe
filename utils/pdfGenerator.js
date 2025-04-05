const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.generarFactura = (venta, detalles, cliente, callback) => {
  const doc = new PDFDocument();
  const fileName = `factura_${venta.id}.pdf`;
  const filePath = path.join(__dirname, `../facturas/${fileName}`);

  // Crear carpeta si no existe
  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  doc.fontSize(18).text('Factura de Venta', { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).text(`Factura Nº: ${venta.id}`);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`);
  doc.text(`Cliente: ${cliente.nombre}`);
  doc.text(`Email: ${cliente.email}`);
  doc.text(`Teléfono: ${cliente.telefono}`);
  doc.moveDown();

  doc.text('Detalle de productos:', { underline: true });
  detalles.forEach((item) => {
    doc.text(`- ${item.Producto.nombre} | Cant: ${item.cantidad} | Subtotal: $${item.subtotal}`);
  });

  doc.moveDown();
  doc.fontSize(14).text(`Total: $${venta.total}`, { align: 'right' });

  doc.end();

  stream.on('finish', () => {
    callback(`/facturas/${fileName}`);
  });
};
