const CompletedMeditationsModel = require('../modelo/completedMeditationsModel');

class CompletedMeditationsController {
  static async getAll(req, res) {
    try {
      const data = await CompletedMeditationsModel.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const id = req.params.id;
      const data = await CompletedMeditationsModel.getById(id);
      if (!data) {
        return res.status(404).json({ message: 'Not found' });
      }
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const created = await CompletedMeditationsModel.create(req.body);
      res.status(201).json(created);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const id = req.params.id;
      const updated = await CompletedMeditationsModel.update(id, req.body);
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const id = req.params.id;
      const deleted = await CompletedMeditationsModel.delete(id);
      res.json(deleted);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CompletedMeditationsController;