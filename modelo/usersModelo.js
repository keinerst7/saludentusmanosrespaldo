const pool = require('./bd/Conexion');
const bcrypt = require('bcrypt');

const usersModelo = {
  // obtenerTodos: Función para obtener todos los usuarios de la base de datos.
  obtenerTodos: async () => {
    try {
      const [rows] = await pool.query('SELECT * FROM users');
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // obtenerPorId: Función para obtener un usuario específico por su ID.
  obtenerPorId: async (id) => {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  // crear: Función para insertar un nuevo usuario en la base de datos, encriptando la contraseña antes de guardarla.
  crear: async (usuario) => {
    try {
      const { name, email, password, phone, location, age, weight, height, goal, bio, joinDate } = usuario;

      // Validaciones básicas
      if (!name || !email || !password || !phone || !joinDate) {
        throw new Error('Campos obligatorios faltantes.');
      }

      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10); // 10 es un saltRounds recomendado

      const [result] = await pool.query(
        'INSERT INTO users (name, email, password, phone, location, age, weight, height, goal, bio, joinDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [name, email, hashedPassword, phone, location, age, weight, height, goal, bio, joinDate]
      );

      return { id: result.insertId, ...usuario, password: '********' }; // Nunca retornes el hash
    } catch (error) {
      throw error;
    }
  },

  // actualizar: Función para actualizar los datos de un usuario existente por su ID. Encripta la contraseña si se incluye.
  actualizar: async (id, usuario) => {
    try {
      // Si incluye password, lo encripta antes de actualizar
      if (usuario.password) {
        usuario.password = await bcrypt.hash(usuario.password, 10);
      }

      const [result] = await pool.query('UPDATE users SET ? WHERE id = ?', [usuario, id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  },

  // eliminar: Función para borrar un usuario de la base de datos por su ID.
  eliminar: async (id) => {
    try {
      const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = usersModelo;