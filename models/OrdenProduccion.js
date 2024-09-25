'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class OrdenProduccion extends Model {
    static associate(models) {
      OrdenProduccion.hasMany(models.DetalleOrdenProduccion, { foreignKey: 'id_orden', as: 'detallesOrdenProduccion' });
    }
  }

  OrdenProduccion.init({
    id_orden: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numero_orden: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    fecha_orden: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    produccion_completada: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'OrdenProduccion',
    tableName: 'orden_produccion',
    timestamps: true,
  });

  return OrdenProduccion;
};
