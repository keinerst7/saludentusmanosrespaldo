const MeditationModel = require('../modelo/meditationModel');

class MeditationController {
  static async getAll(req, res) {
    try {
      const sessions = await MeditationModel.getAll();
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const session = await MeditationModel.getById(req.params.id);
      if (!session) {
        return res.status(404).json({ message: 'Sesión de meditación no encontrada' });
      }
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = MeditationController;