const meditationModel = require('../modelo/meditationModel');

const validateSession = (session) => {
  const { name, duration } = session;
  if (!name || typeof name !== 'string') return 'Nombre inválido';
  if (!duration || isNaN(duration)) return 'Duración inválida';
  return null;
};

const meditationController = {
  async getAll(req, res) {
    try {
      const sessions = await meditationModel.getAll();
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener sesiones' });
    }
  },

  async getById(req, res) {
    try {
      const session = await meditationModel.getById(req.params.id);
      if (!session) return res.status(404).json({ message: 'Sesión no encontrada' });
      res.json(session);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la sesión' });
    }
  },

  async create(req, res) {
    const error = validateSession(req.body);
    if (error) return res.status(400).json({ message: error });

    try {
      const newSession = await meditationModel.create(req.body);
      res.status(201).json(newSession);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la sesión' });
    }
  },

  async update(req, res) {
    const error = validateSession(req.body);
    if (error) return res.status(400).json({ message: error });

    try {
      const updated = await meditationModel.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: 'Sesión no encontrada' });
      res.json({ message: 'Sesión actualizada correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la sesión' });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await meditationModel.delete(req.params.id);
      if (!deleted) return res.status(404).json({ message: 'Sesión no encontrada' });
      res.json({ message: 'Sesión eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la sesión' });
    }
  }
};

module.exports = meditationController;