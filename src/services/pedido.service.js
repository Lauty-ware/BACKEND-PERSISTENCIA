import { prisma } from '../config/prisma.js';

export class PedidoService {
  async procesarCheckout({ usuarioId, productosComprados }) {
    // Transacción ACID para asegurar la integridad de la compra
    return await prisma.$transaction(async (tx) => {
      let totalCalculado = 0;

      // 1. Crear el pedido inicial
      const pedido = await tx.pedido.create({
        data: { usuarioId: Number(usuarioId) }
      });

      // 2. Procesar cada producto del carrito
      for (const item of productosComprados) {
        const producto = await tx.producto.findUnique({
          where: { id: Number(item.productoId) }
        });

        if (!producto) {
          throw new Error(`El producto con ID ${item.productoId} no existe.`);
        }

        // Validación crítica de stock
        if (producto.stock < item.cantidad) {
          throw new Error(`Stock insuficiente para el producto: ${producto.nombre}`);
        }

        // Restar el inventario
        await tx.producto.update({
          where: { id: producto.id },
          data: { stock: producto.stock - item.cantidad }
        });

        // Crear registro de detalle
        await tx.detallePedido.create({
          data: {
            pedidoId: pedido.id,
            productoId: producto.id,
            cantidad: item.cantidad,
            precioUnit: producto.precio
          }
        });

        totalCalculado += producto.precio * item.cantidad;
      }

      // 3. Actualizar el pedido con el total final
      const pedidoFinal = await tx.pedido.update({
        where: { id: pedido.id },
        data: { total: totalCalculado },
        include: { detalles: true }
      });

      return pedidoFinal;
    });
  }
}