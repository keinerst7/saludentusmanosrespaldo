const pool = require('./bd/Conexion');

const triggerModel = {
  async obtenerTodos(mood_entry_id) {
    const [rows] = await pool.query(
      'SELECT * FROM mood_triggers WHERE mood_entry_id = ?',
      [mood_entry_id]
    );
    return rows;
  },

  async obtenerPorId(id) {
    const [rows] = await pool.query('SELECT * FROM mood_triggers WHERE id = ?', [id]);
    return rows[0];
  },

  async crear({ mood_entry_id, trigger_text }) {
    const [result] = await pool.query(
      'INSERT INTO mood_triggers (mood_entry_id, trigger_text) VALUES (?, ?)',
      [mood_entry_id, trigger_text]
    );
    return result.insertId;
  },

  async actualizar(id, { trigger_text }) {
    const [result] = await pool.query(
      'UPDATE mood_triggers SET trigger_text = ? WHERE id = ?',
      [trigger_text, id]
    );
    return result.affectedRows;
  },

  async eliminar(id) {
    const [result] = await pool.query('DELETE FROM mood_triggers WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = triggerModel;