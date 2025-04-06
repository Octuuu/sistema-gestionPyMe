const { Client } = require('../models');

exports.create = async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear cliente', error });
  }
};

exports.getAll = async (req, res) => {
  const clients = await Client.findAll();
  res.json(clients);
};

exports.getById = async (req, res) => {
  const client = await Client.findByPk(req.params.id);
  if (!client) return res.status(404).json({ message: 'Cliente no encontrado' });
  res.json(client);
};

exports.update = async (req, res) => {
  const client = await Client.findByPk(req.params.id);
  if (!client) return res.status(404).json({ message: 'Cliente no encontrado' });

  await client.update(req.body);
  res.json(client);
};

exports.remove = async (req, res) => {
  const client = await Client.findByPk(req.params.id);
  if (!client) return res.status(404).json({ message: 'Cliente no encontrado' });

  await client.destroy();
  res.json({ message: 'Cliente eliminado' });
};
