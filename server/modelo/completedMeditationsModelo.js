const pool = require('./bd/Conexion');

const completedMeditationsModelo = {
  obtenerTodos: async () => {
    const [rows] = await pool.query(`
      SELECT cm.*, u.nombre AS usuario, ms.name AS sesion
      FROM completed_meditations cm
      JOIN users u ON cm.user_id = u.id
      JOIN meditation_sessions ms ON cm.meditation_id = ms.id
    `);
    return rows;
  },

  obtenerPorId: async (id) => {
    const [rows] = await pool.query('SELECT * FROM completed_meditations WHERE id = ?', [id]);
    return rows[0];
  },

  crear: async ({ user_id, meditation_id, completed_date }) => {
    const [result] = await pool.query(
      'INSERT INTO completed_meditations (user_id, meditation_id, completed_date) VALUES (?, ?, ?)',
      [user_id, meditation_id, completed_date]
    );
    return result.insertId;
  },

  actualizar: async (id, { user_id, meditation_id, completed_date }) => {
    const [result] = await pool.query(
      'UPDATE completed_meditations SET user_id = ?, meditation_id = ?, completed_date = ? WHERE id = ?',
      [user_id, meditation_id, completed_date, id]
    );
    return result.affectedRows;
  },

  eliminar: async (id) => {
    const [result] = await pool.query('DELETE FROM completed_meditations WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = completedMeditationsModelo;