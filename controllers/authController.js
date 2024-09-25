const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario'); // Asegúrate de que la ruta sea correcta

const login = async (req, res) => {
    const { email, password } = req.body;

    // Validación de entrada
    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos.' });
    }

    try {
        // Buscar el usuario por su email
        const usuario = await Usuario.findOne({ where: { email } });
        console.log("Usuario encontrado:", usuario); // Verifica la respuesta

        // Si no se encuentra el usuario, devuelve un error 404
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Compara la contraseña proporcionada con la almacenada
        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Contraseña incorrecta' }); // Cambiar a 401 para errores de autenticación
        }

        // Asegúrate de que `usuario` tiene el campo `id_usuario`
        const idUsuario = usuario.id_usuario;  // Este campo debe existir

        // Generar el token JWT
        const token = jwt.sign({ id_usuario: idUsuario, id_rol: usuario.id_rol }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Preparar la respuesta que incluye el token y el ID del usuario
        const response = { token, id_usuario: idUsuario };  
        console.log("Respuesta de login:", response);
        
        // Devolver la respuesta con éxito
        res.status(200).json(response);
    } catch (error) {
        // Log del error
        console.error("Error en el login:", error.message); 
        // Devolver un error genérico con el mensaje del error
        res.status(500).json({ error: error.message });
    }
};

module.exports = { login };
