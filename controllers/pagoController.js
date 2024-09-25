const { Pago, Venta, Pedido } = require('../models');

exports.registrarPago = async (req, res) => {
    const { id_venta, monto } = req.body;
    try {
        const nuevoPago = await Pago.create({ id_venta, fecha_pago: new Date(), monto });

        // Calcular el monto total pagado
        const pagos = await Pago.findAll({ where: { id_venta } });
        const totalPagado = pagos.reduce((total, pago) => total + pago.monto, 0);

        // Obtener el total de la venta
        const venta = await Venta.findByPk(id_venta);
        const totalVenta = venta.precio_total; // Asumiendo que existe el campo `precio_total` en Ventas

        // Actualizar el estado de la venta y el pedido si está completamente pagado
        if (totalPagado >= totalVenta) {
            await Venta.update({ pagado: true }, { where: { id_venta } });
            await Pedido.update({ pagado: true }, { where: { id_venta } });
        }

        res.status(201).json(nuevoPago);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Otros controladores CRUD para Pago
exports.obtenerPagos = async (req, res) => {
    try {
        const pagos = await Pago.findAll();
        res.json(pagos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerPagoPorId = async (req, res) => {
    try {
        const pago = await Pago.findByPk(req.params.id);
        if (!pago) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }
        res.json(pago);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.actualizarPago = async (req, res) => {
    try {
        const pago = await Pago.update(req.body, { where: { id_pago: req.params.id } });
        res.json(pago);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.eliminarPago = async (req, res) => {
    try {
        await Pago.destroy({ where: { id_pago: req.params.id } });
        res.json({ message: 'Pago eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
