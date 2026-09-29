import { prisma } from '../config/prisma.js';

export class PedidoRepository {
  async obtenerTodos() {
    return await prisma.pedido.findMany({
      include: { detalles: true }
    });
  }

  async buscarPorId(id) {
    return await prisma.pedido.findUnique({
      where: { id: Number(id) },
      include: { detalles: true }
    });
  }
}