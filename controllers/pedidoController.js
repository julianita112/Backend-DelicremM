const { Pedido, Cliente, DetallePedido, Venta } = require('../models');

const moment = require('moment-timezone');

exports.crearPedido = async (req, res) => {
    const { numero_pedido, id_cliente, fecha_pago, fecha_entrega, estado, pagado, detallesPedido, total, activo = 1 } = req.body;

    try {
        const estadoInicial = pagado ? "Pendiente de Preparación" : "Esperando Pago";
        
        // Establece la fecha actual en la zona horaria de Colombia
        const fecha_registro = moment().tz('America/Bogota').toDate(); 

        const pedido = await Pedido.create({ 
            numero_pedido, 
            id_cliente, 
            fecha_pago, 
            fecha_entrega, 
            fecha_registro, // Utiliza la fecha actual con zona horaria de Colombia
            estado: estadoInicial, 
            pagado, 
            total,
            activo 
        });

        for (let detalle of detallesPedido) {
            await DetallePedido.create({ ...detalle, id_pedido: pedido.id_pedido });
        }

        res.status(201).json(pedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.obtenerPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll({
            attributes: { exclude: ['id_venta'] },
            include: [
                { model: Cliente, as: 'clientesh' },
                { model: DetallePedido, as: 'detallesPedido' }
            ]
        });
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerPedidoPorId = async (req, res) => {
    try {
        const pedido = await Pedido.findByPk(req.params.id, {
            attributes: { exclude: ['id_venta'] },
            include: [
                { model: Cliente, as: 'clientesh' },
                { model: DetallePedido, as: 'detallesPedido' }
            ]
        });
        
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }
        res.json(pedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.actualizarEstadoPedido = async (req, res) => {
  const { numero_pedido } = req.params;
  const { estado } = req.body;

  try {
    const pedido = await Pedido.findOne({ where: { numero_pedido }, attributes: { exclude: ['id_venta'] } });

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    if (pedido.estado === "Completado") {
      return res.status(400).json({ error: 'El pedido ya está completado y no se puede actualizar.' });
    }

    const estadosValidos = ["Esperando Pago", "Pendiente de Preparación", "En Preparación", "Listo Para Entrega", "Completado"];
    const indiceEstadoActual = estadosValidos.indexOf(pedido.estado);
    const indiceNuevoEstado = estadosValidos.indexOf(estado);

    if (indiceNuevoEstado <= indiceEstadoActual) {
      return res.status(400).json({ error: 'No se puede cambiar a un estado anterior o igual.' });
    }

    pedido.estado = estado;
    await pedido.save();

    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarPedido = async (req, res) => {
    const { id } = req.params;
    const { numero_pedido, id_cliente, fecha_pago, fecha_entrega, estado, pagado, total, detallesPedido } = req.body;

    try {
        const pedido = await Pedido.findByPk(id, {
            attributes: { exclude: ['id_venta'] },
        });

        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        if (pedido.estado === "Completado") {
            return res.status(400).json({ error: 'El pedido ya está completado y no se puede actualizar.' });
        }

        await pedido.update({ numero_pedido, id_cliente, fecha_pago, fecha_entrega, estado, pagado, total });

        if (Array.isArray(detallesPedido)) {
            const detalleIds = detallesPedido.map(detalle => detalle.id_detalle_pedido);

            const detallesActuales = await DetallePedido.findAll({ where: { id_pedido: pedido.id_pedido } });

            for (let detalleActual of detallesActuales) {
                if (!detalleIds.includes(detalleActual.id_detalle_pedido)) {
                    await detalleActual.destroy();
                }
            }

            for (let detalle of detallesPedido) {
                if (detalle.id_detalle_pedido) {
                    const detalleExistente = await DetallePedido.findByPk(detalle.id_detalle_pedido);

                    if (detalleExistente) {
                        await detalleExistente.update({
                            id_producto: detalle.id_producto,
                            cantidad: detalle.cantidad,
                        });
                    }
                } else {
                    await DetallePedido.create({
                        ...detalle,
                        id_pedido: pedido.id_pedido,
                    });
                }
            }
        }

        const pedidoActualizado = await Pedido.findByPk(id, {
            attributes: { exclude: ['id_venta'] },
            include: [
                { model: Cliente, as: 'clientesh' },
                { model: DetallePedido, as: 'detallesPedido' }
            ]
        });

        res.status(200).json(pedidoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.eliminarPedido = async (req, res) => {
    const { id } = req.params;

    try {
        const pedido = await Pedido.findByPk(id, {
            attributes: { exclude: ['id_venta'] },
        });

        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        const ventaAsociada = await Venta.findOne({ where: { numero_pedido: pedido.numero_pedido } });

        if (ventaAsociada) {
            return res.status(400).json({ error: 'No se puede eliminar el pedido, porque está asociado a una venta.' });
        }

        await Pedido.destroy({ where: { id_pedido: id } });
        res.json({ message: 'Pedido eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.actualizarEstadoActivoPedido = async (req, res) => {
    const { id } = req.params;
    const { activo, anulacion } = req.body;

    try {
        // Buscar el pedido excluyendo el atributo id_venta
        const pedido = await Pedido.findByPk(id, {
            attributes: { exclude: ['id_venta'] },
        });

        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        if (pedido.anulacion && !activo) {
            return res.status(400).json({ error: 'Un pedido anulado no se puede volver a activar.' });
        }

        if (!activo && !anulacion) {
            return res.status(400).json({ error: 'Debe proporcionar un motivo de anulación cuando se desactiva el pedido.' });
        }

        pedido.activo = activo;
        pedido.anulacion = anulacion || pedido.anulacion; // Guardar el motivo de anulación solo si se proporciona
        await pedido.save();

        res.status(200).json(pedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.obtenerPedidosActivos = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll({
            where: { activo: true },
            attributes: { exclude: ['id_venta'] }
        });
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
