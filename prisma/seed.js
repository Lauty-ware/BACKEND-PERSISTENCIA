import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Limpiando base de datos...');
  await prisma.detallePedido.deleteMany({});
  await prisma.pedido.deleteMany({});
  await prisma.producto.deleteMany({});
  await prisma.usuario.deleteMany({});

  console.log('Creando usuarios de prueba...');
  const usuario1 = await prisma.usuario.create({
    data: {
      nombre: 'Juan Pérez',
      email: 'juan.perez@example.com',
    },
  });

  const usuario2 = await prisma.usuario.create({
    data: {
      nombre: 'María Gómez',
      email: 'maria.gomez@example.com',
    },
  });

  console.log('Creando productos de prueba...');
  await prisma.producto.createMany({
    data: [
      { nombre: 'Laptop Gamer', precio: 1200.00, stock: 10 },
      { nombre: 'Mouse Inalámbrico', precio: 25.50, stock: 50 },
      { nombre: 'Teclado Mecánico', precio: 80.00, stock: 15 },
      { nombre: 'Monitor 27" 4K', precio: 350.00, stock: 5 },
    ],
  });

  console.log('✅ Base de datos poblada exitosamente.');
  console.log({ usuario1, usuario2 });
}

main()
  .catch((e) => {
    console.error('Error al poblar la base de datos:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  