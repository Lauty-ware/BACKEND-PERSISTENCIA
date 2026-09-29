import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import pedidoRoutes from './routes/pedido.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();
app.use(express.json());

const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Registrar rutas
app.use('/api', pedidoRoutes);
app.use('/api', adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`Documentación en http://localhost:${PORT}/api-docs`);
});

