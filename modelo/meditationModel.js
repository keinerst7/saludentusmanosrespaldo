const pool = require('./bd/Conexion');

const meditationModel = {
  async getAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM meditation_sessions');
      return rows;
    } catch (error) {
      throw error;
    }
  },

  async getById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM meditation_sessions WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  async create(session) {
    const { name, duration, category, description } = session;
    try {
      const [result] = await pool.query(
        'INSERT INTO meditation_sessions (name, duration, category, description) VALUES (?, ?, ?, ?)',
        [name, duration, category || null, description || null]
      );
      return { id: result.insertId, ...session };
    } catch (error) {
      throw error;
    }
  },

  async update(id, session) {
    const { name, duration, category, description } = session;
    try {
      const [result] = await pool.query(
        'UPDATE meditation_sessions SET name = ?, duration = ?, category = ?, description = ? WHERE id = ?',
        [name, duration, category || null, description || null, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  },

  async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM meditation_sessions WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = meditationModel;