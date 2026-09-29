import { prisma } from '../config/prisma.js';

export class AdminController {
  // --- USUARIOS ---
  static async crearUsuario(req, res) {
    try {
      const { nombre, email } = req.body;
      if (!nombre || !email) {
        return res.status(400).json({ error: 'Nombre y email son requeridos.' });
      }

      const nuevoUsuario = await prisma.usuario.create({
        data: { nombre, email },
      });
      return res.status(201).json(nuevoUsuario);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async listarUsuarios(req, res) {
    const usuarios = await prisma.usuario.findMany();
    return res.status(200).json(usuarios);
  }

  // --- PRODUCTOS ---
  static async crearProducto(req, res) {
    try {
      const { nombre, precio, stock } = req.body;
      if (!nombre || precio === undefined || stock === undefined) {
        return res.status(400).json({ error: 'Nombre, precio y stock son requeridos.' });
      }

      const nuevoProducto = await prisma.producto.create({
        data: {
          nombre,
          precio: Number(precio),
          stock: Number(stock),
        },
      });
      return res.status(201).json(nuevoProducto);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async listarProductos(req, res) {
    const productos = await prisma.producto.findMany();
    return res.status(200).json(productos);
  }
}
