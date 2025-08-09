const moodModel = require('../modelo/moodModel');

const moodController = {
  async obtenerTodos(req, res) {
    try {
      const { userId } = req.params;
      const data = await moodModel.obtenerTodos(userId);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener entradas' });
    }
  },

  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const entry = await moodModel.obtenerPorId(id);
      if (!entry) return res.status(404).json({ error: 'Entrada no encontrada' });
      res.json(entry);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener entrada' });
    }
  },

  async crear(req, res) {
    try {
      const { user_id, date, mood, note, stress, energy } = req.body;

      if (!user_id || !date || !mood) {
        return res.status(400).json({ error: 'user_id, date y mood son obligatorios' });
      }

      const id = await moodModel.crear({ user_id, date, mood, note, stress, energy });
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear entrada' });
    }
  },

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { date, mood, note, stress, energy } = req.body;

      if (!date || !mood) {
        return res.status(400).json({ error: 'date y mood son obligatorios' });
      }

      const updated = await moodModel.actualizar(id, { date, mood, note, stress, energy });
      if (updated === 0) return res.status(404).json({ error: 'Entrada no encontrada' });

      res.json({ mensaje: 'Entrada actualizada' });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar entrada' });
    }
  },

  async eliminar(req, res) {
    try {
      const { id } = req.params;
      const deleted = await moodModel.eliminar(id);
      if (deleted === 0) return res.status(404).json({ error: 'Entrada no encontrada' });
      res.json({ mensaje: 'Entrada eliminada' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar entrada' });
    }
  }
};

module.exports = moodController;