const pool = require('./bd/Conexion');

class MeditationModel {
  static async getAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM meditation_sessions');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM meditation_sessions WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MeditationModel;