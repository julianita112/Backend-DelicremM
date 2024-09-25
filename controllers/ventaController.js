const { Venta, DetalleVenta, Producto, Insumo, Cliente, FichaTecnica, DetalleFichaTecnica } = require('../models');

const crearVenta = async (req, res) => {
    const { numero_venta, id_cliente, fecha_venta, fecha_entrega, estado, pagado, detalleVentas, total, activo = 1 } = req.body;

    // Generar un número de venta único si no se proporciona
    const numeroVenta = numero_venta || 'VENTA-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    try {
        const venta = await Venta.create({ numero_venta: numeroVenta, id_cliente, fecha_venta, fecha_entrega, estado, pagado, total, activo });

        for (let detalle of detalleVentas) {
            const producto = await Producto.findByPk(detalle.id_producto);
            if (producto) {
                await DetalleVenta.create({ ...detalle, id_venta: venta.id_venta });
            } else {
                return res.status(404).json({ error: `Producto no encontrado: ${detalle.id_producto}` });
            }
        }

        res.status(201).json(venta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const actualizarEstadoVenta = async (req, res) => {
    const id_venta = req.params.id;
    const { estado } = req.body;

    try {
        const venta = await Venta.findByPk(id_venta, {
            include: [{ model: DetalleVenta, as: 'detalles' }]
        });

        if (!venta) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }


        venta.estado = estado;
        await venta.save();
        res.status(200).json(venta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerVentasActivas = async (req, res) => {
    try {
        const ventas = await Venta.findAll({ where: { activo: 1 } });
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const cambiarEstadoActivoVenta = async (req, res) => {
    try {
        const venta = await Venta.findByPk(req.params.id);
        if (!venta) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }

        venta.activo = !venta.activo;
        await venta.save();
        res.json(venta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerVentas = async (req, res) => {
    try {
        const ventas = await Venta.findAll({
            include: [
                {
                    model: DetalleVenta,
                    as: 'detalles',
                },
                {
                    model: Cliente,
                    as: 'cliente'
                }
            ]
        });
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const obtenerVentaPorId = async (req, res) => {
    try {
        const venta = await Venta.findByPk(req.params.id, {
            include: [
                {
                    model: DetalleVenta,
                    as: 'detalles',
                },
                {
                    model: Cliente,
                    as: 'cliente',
                }
            ]
        });
        if (!venta) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        res.json(venta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const actualizarVenta = async (req, res) => {
    const { id } = req.params;
    const { id_cliente, fecha_venta, estado, pagado, detalleVentas } = req.body;

    try {
        const venta = await Venta.findByPk(id);

        if (!venta) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }

        await venta.update({ id_cliente, fecha_venta, estado, pagado });

        if (Array.isArray(detalleVentas)) {
            const detalleIds = detalleVentas.map(detalle => detalle.id_detalle_venta);

            const detallesActuales = await DetalleVenta.findAll({ where: { id_venta: venta.id_venta } });

            for (let detalleActual of detallesActuales) {
                if (!detalleIds.includes(detalleActual.id_detalle_venta)) {
                    await detalleActual.destroy();
                }
            }

            for (let detalle of detalleVentas) {
                const detalleExistente = await DetalleVenta.findByPk(detalle.id_detalle_venta);

                if (detalleExistente) {
                    await detalleExistente.update({
                        id_producto: detalle.id_producto,
                        cantidad: detalle.cantidad,
                    });
                } else {
                    await DetalleVenta.create({
                        ...detalle,
                        id_venta: venta.id_venta,
                    });
                }
            }
        }

        res.status(200).json(venta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminarVenta = async (req, res) => {
    try {
        await Venta.destroy({ where: { id_venta: req.params.id } });
        res.json({ message: 'Venta eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearVenta,
    actualizarEstadoVenta,
    obtenerVentas,
    obtenerVentaPorId,
    actualizarVenta,
    eliminarVenta,
    obtenerVentasActivas,
    cambiarEstadoActivoVenta,
};
