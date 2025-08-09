const pool = require('./bd/Conexion');

const moodModel = {
  async obtenerTodos(userId) {
    const [rows] = await pool.query('SELECT * FROM mood_entries WHERE user_id = ?', [userId]);
    return rows;
  },

  async obtenerPorId(id) {
    const [rows] = await pool.query('SELECT * FROM mood_entries WHERE id = ?', [id]);
    return rows[0];
  },

  async crear({ user_id, date, mood, note, stress, energy }) {
    const [result] = await pool.query(
      'INSERT INTO mood_entries (user_id, date, mood, note, stress, energy) VALUES (?, ?, ?, ?, ?, ?)',
      [user_id, date, mood, note || null, stress || null, energy || null]
    );
    return result.insertId;
  },

  async actualizar(id, { date, mood, note, stress, energy }) {
    const [result] = await pool.query(
      'UPDATE mood_entries SET date = ?, mood = ?, note = ?, stress = ?, energy = ? WHERE id = ?',
      [date, mood, note || null, stress || null, energy || null, id]
    );
    return result.affectedRows;
  },

  async eliminar(id) {
    const [result] = await pool.query('DELETE FROM mood_entries WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = moodModel;