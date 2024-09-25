const { Cliente, Venta } = require('../models');


exports.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCliente = async (req, res) => {
  const { nombre, contacto, email , tipo_documento, numero_documento, activo = true } = req.body;
  try {
    const cliente = await Cliente.create({ nombre, contacto, email, tipo_documento, numero_documento, activo });
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getClientesActivos = async (req, res) => {
  try {
    const clientes = await Cliente.findAll({ where: { activo: true } });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.cambiarEstadoCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    cliente.activo = !cliente.activo;
    await cliente.save();
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCliente = async (req, res) => {
  const { nombre, contacto, email, tipo_documento, numero_documento } = req.body;
  try {
    const [updated] = await Cliente.update({ nombre, contacto, email, tipo_documento, numero_documento }, {
      where: { id_cliente: req.params.id }
    });
    if (updated) {
      const updatedCliente = await Cliente.findByPk(req.params.id);
      res.json(updatedCliente);
    } else {
      res.status(404).json({ error: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCliente = async (req, res) => {
  try {
      const cliente = await Cliente.findByPk(req.params.id);
      if (!cliente) {
          return res.status(404).json({ error: 'Cliente no encontrado' });
      }

      const ventasAsociadas = await Venta.findAll({ where: { id_cliente: cliente.id_cliente } });
      if (ventasAsociadas.length > 0) {
          return res.status(400).json({ 
              error: 'No se puede eliminar el cliente. Primero elimine las ventas asociadas.' 
          });
      }

      await cliente.destroy();
      res.json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
