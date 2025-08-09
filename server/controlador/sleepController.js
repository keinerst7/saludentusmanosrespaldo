const SleepModel = require('../modelo/sleepModel');

class SleepController {
  static async getAll(req, res) {
    try {
      const entries = await SleepModel.getAll();
      res.json(entries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const entry = await SleepModel.getById(req.params.id);
      if (!entry) {
        return res.status(404).json({ message: 'Entrada de sueño no encontrada' });
      }
      res.json(entry);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { hours, quality } = req.body;
      if (hours < 0 || hours > 24) {
        return res.status(400).json({ message: 'Las horas deben estar entre 0 y 24' });
      }
      if (quality && (quality < 1 || quality > 5)) {
        return res.status(400).json({ message: 'La calidad debe estar entre 1 y 5' });
      }
      const newEntry = await SleepModel.create(req.body);
      res.status(201).json(newEntry);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { hours, quality } = req.body;
      if (hours && (hours < 0 || hours > 24)) {
        return res.status(400).json({ message: 'Las horas deben estar entre 0 y 24' });
      }
      if (quality && (quality < 1 || quality > 5)) {
        return res.status(400).json({ message: 'La calidad debe estar entre 1 y 5' });
      }
      const updatedEntry = await SleepModel.update(req.params.id, req.body);
      res.json(updatedEntry);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const result = await SleepModel.delete(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = SleepController;