const pool = require('./bd/Conexion');

class CompletedMeditationsModel {
  static async getAll() {
    const [rows] = await pool.query('SELECT c.*, m.name, c.completed_date as completedDate, m.description FROM completed_meditations c INNER JOIN meditation_sessions m ON c.meditation_id = m.id');
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM completed_meditations WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { user_id, meditation_id, completed_date, duration } = data;
    const [result] = await pool.query(
      'INSERT INTO completed_meditations (user_id, meditation_id, completed_date, duration) VALUES (?, ?, ?, ?)',
      [user_id, meditation_id, completed_date, duration]
    );
    return { id: result.insertId, ...data };
  }

  static async update(id, data) {
    const { user_id, meditation_id, completed_date } = data;
    await pool.query(
      'UPDATE completed_meditations SET user_id = ?, meditation_id = ?, completed_date = ? WHERE id = ?',
      [user_id, meditation_id, completed_date, id]
    );
    return { id, ...data };
  }

  static async delete(id) {
    await pool.query('DELETE FROM completed_meditations WHERE id = ?', [id]);
    return { message: 'Deleted successfully' };
  }
}


module.exports = CompletedMeditationsModel;