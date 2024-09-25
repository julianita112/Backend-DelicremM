const express = require('express');
const app = express();
const sequelize = require('./config/database');
const dotenv = require('dotenv');
const cors = require('cors');


const errorMiddleware = require('./middlewares/errorMiddleware');
const usuarioRoutes = require('./routes/usuarioRoutes');
const rolRoutes = require('./routes/rolRoutes');
const permisoRoutes = require('./routes/permisoRoutes');
const pagoRoutes = require('./routes/pagoRoutes');
const proveedorRoutes = require('./routes/proveedorRoutes');
const productoRoutes = require('./routes/productoRoutes');
const compraRoutes = require('./routes/compraRoutes');
const ventaRoutes = require('./routes/ventaRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const fichaTecnicaRoutes = require('./routes/fichaTecnicaRoutes');
const insumoRoutes = require('./routes/insumoRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const detalleCompraRoutes = require('./routes/detalleCompraRoutes');
const rolPermisoRoutes = require('./routes/rolPermisoRoutes');
const detallePedidoRoutes = require('./routes/detallePedidoRoutes');
const categoriaInsumoRoutes = require('./routes/categoriaInsumoRoutes');
const ordenProduccionRoutes = require('./routes/ordenProduccionRoutes');

// Importar y definir las asociaciones
require('./config/associations');

dotenv.config();

app.use(express.json());
app.use(cors());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/permisos', permisoRoutes);
app.use('/api/pagos', pagoRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/compras', compraRoutes);
app.use('/api/ventas', ventaRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/fichastecnicas', fichaTecnicaRoutes);
app.use('/api/insumos', insumoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/detallecompras', detalleCompraRoutes);
app.use('/api/rol_permisos', rolPermisoRoutes);
app.use('/api/detallepedidos', detallePedidoRoutes);
app.use('/api/categorias_insumo', categoriaInsumoRoutes);
app.use('/api/ordenesproduccion', ordenProduccionRoutes);


app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

// Sincronización de Sequelize
sequelize.sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });