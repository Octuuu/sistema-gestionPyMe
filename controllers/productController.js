const { Product } = require('../models');

exports.create = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear producto', error });
  }
};

exports.getAll = async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
};

exports.getById = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json(product);
};

exports.update = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

  await product.update(req.body);
  res.json(product);
};

exports.remove = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

  await product.destroy();
  res.json({ message: 'Producto eliminado' });
};
