'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Pago extends Model {
    static associate(models) {
      Pago.belongsTo(models.Venta, { foreignKey: 'id_venta', as: 'ventaPago' });
    }
  }

  Pago.init({
    id_pago: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_venta: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fecha_pago: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
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
    modelName: 'Pago',
    tableName: 'pagos',
    timestamps: true,
  });

  return Pago;
};
