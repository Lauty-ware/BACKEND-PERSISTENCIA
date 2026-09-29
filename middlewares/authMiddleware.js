const jwt = require('jsonwebtoken');
const JWT_SECRET = 'mi_clave_secreta_super_segura_123!';

exports.verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) return res.status(401).json({ error: 'Acceso denegado. No se proporcionó un token.' });

    try {
        const payloadDecodificado = jwt.verify(token, JWT_SECRET);
        req.usuario = payloadDecodificado; 
        next(); 
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido o expirado.' });
    }
};

exports.requerirRol = (rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({ error: 'No tienes los permisos necesarios.' });
        }
        next(); 
    };
};

