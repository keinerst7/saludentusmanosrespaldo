const pool = require('./bd/Conexion');

class SleepModel {
  static async getAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM sleep_entries');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM sleep_entries WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async create(entry) {
    try {
      const [result] = await pool.query('INSERT INTO sleep_entries SET ?', entry);
      return { id: result.insertId, ...entry };
    } catch (error) {
      throw error;
    }
  }

  static async update(id, entry) {
    try {
      await pool.query('UPDATE sleep_entries SET ? WHERE id = ?', [entry, id]);
      return { id, ...entry };
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      await pool.query('DELETE FROM sleep_entries WHERE id = ?', [id]);
      return { message: 'Registro de sueño eliminado correctamente' };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SleepModel;