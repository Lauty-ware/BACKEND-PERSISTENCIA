import { PedidoService } from '../services/pedido.service.js';

const pedidoService = new PedidoService();

export class PedidoController {
  static async crearPedido(req, res) {
    try {
      const { usuarioId, productosComprados } = req.body;

      if (!usuarioId || !Array.isArray(productosComprados) || productosComprados.length === 0) {
        return res.status(400).json({ 
          error: 'Datos de entrada inválidos. Se requiere usuarioId y al menos un producto.' 
        });
      }

      const nuevoPedido = await pedidoService.procesarCheckout({ usuarioId, productosComprados });
      return res.status(201).json(nuevoPedido);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}