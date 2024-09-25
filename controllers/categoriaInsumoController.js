const { CategoriaInsumo, Insumo } = require('../models');

exports.obtenerCategoriasInsumos = async (req, res) => {
  try {
    const categoriasInsumos = await CategoriaInsumo.findAll({
      include: [{ model: Insumo, as: 'insumos' }]
    });
    res.json(categoriasInsumos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerCategoriasInsumosActivas = async (req, res) => {
  try {
    const categoriasInsumos = await CategoriaInsumo.findAll({
      where: { activo: true },
      include: [{ model: Insumo, as: 'insumos' }]
    });
    res.json(categoriasInsumos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerCategoriaInsumoPorId = async (req, res) => {
  try {
    const categoriaInsumo = await CategoriaInsumo.findByPk(req.params.id, {
      include: [{ model: Insumo, as: 'insumos' }]
    });
    if (!categoriaInsumo) {
      return res.status(404).json({ error: 'Categoría de Insumo no encontrada' });
    }
    res.json(categoriaInsumo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.crearCategoriaInsumo = async (req, res) => {
  const { nombre, descripcion, activo = true } = req.body;
  try {
    const categoriaInsumo = await CategoriaInsumo.create({ nombre, descripcion , activo });
    res.status(201).json(categoriaInsumo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarCategoriaInsumo = async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const categoriaInsumo = await CategoriaInsumo.update({ nombre, descripcion }, { where: { id_categoria: req.params.id } });
    if (!categoriaInsumo) {
      return res.status(404).json({ error: 'Categoría de Insumo no encontrada' });
    }
    res.json(categoriaInsumo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarEstadoCategoriaInsumo = async (req, res) => {
  const { activo } = req.body;
  try {
    const categoriaInsumo = await CategoriaInsumo.findByPk(req.params.id);
    if (!categoriaInsumo) {
      return res.status(404).json({ error: 'Categoría de Insumo no encontrada' });
    }
    categoriaInsumo.activo = activo;
    await categoriaInsumo.save();
    res.json(categoriaInsumo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarCategoriaInsumo = async (req, res) => {
  try {
    const categoriaInsumo = await CategoriaInsumo.findByPk(req.params.id);
    if (!categoriaInsumo) {
      return res.status(404).json({ error: 'Categoría de Insumo no encontrada' });
    }

    const insumosAsociados = await Insumo.findAll({ where: { id_categoria: categoriaInsumo.id_categoria } });

    if (insumosAsociados.length > 0) {
      return res.status(400).json({ 
        error: 'No se puede eliminar la categoría. Primero elimine o actualice los insumos asociados.' 
      });
    }

    await categoriaInsumo.destroy();
    res.json({ message: 'Categoría de Insumo eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
