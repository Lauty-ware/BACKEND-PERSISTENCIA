const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'mi_clave_secreta_super_segura_123!'; 

exports.register = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;
        const usuarioExistente = await User.findOne({ email });
        if (usuarioExistente) return res.status(400).json({ error: 'El email ya está registrado' });

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const nuevoUsuario = new User({
            nombre, email, password: hashedPassword, rol: rol || 'USER'
        });

        await nuevoUsuario.save();
        res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor', detalle: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await User.findOne({ email });
        if (!usuario) return res.status(401).json({ error: 'Credenciales inválidas' });

        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) return res.status(401).json({ error: 'Credenciales inválidas' });

        const payload = { id: usuario._id, rol: usuario.rol };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); 

        res.json({ mensaje: 'Inicio de sesión exitoso', token: token });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};
