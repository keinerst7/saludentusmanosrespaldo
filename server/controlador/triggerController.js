const triggerModel = require('../modelo/triggerModel');

const triggerController = {
  async obtenerTodos(req, res) {
    try {
      const { mood_entry_id } = req.params;
      const data = await triggerModel.obtenerTodos(mood_entry_id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los triggers' });
    }
  },

  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const trigger = await triggerModel.obtenerPorId(id);
      if (!trigger) return res.status(404).json({ error: 'Trigger no encontrado' });
      res.json(trigger);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el trigger' });
    }
  },

  async crear(req, res) {
    try {
      const { mood_entry_id, trigger_text } = req.body;

      if (!mood_entry_id || !trigger_text) {
        return res.status(400).json({ error: 'mood_entry_id y trigger_text son requeridos' });
      }

      const id = await triggerModel.crear({ mood_entry_id, trigger_text });
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el trigger' });
    }
  },

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { trigger_text } = req.body;

      if (!trigger_text) {
        return res.status(400).json({ error: 'trigger_text es requerido' });
      }

      const actualizado = await triggerModel.actualizar(id, { trigger_text });
      if (actualizado === 0) return res.status(404).json({ error: 'Trigger no encontrado' });

      res.json({ mensaje: 'Trigger actualizado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el trigger' });
    }
  },

  async eliminar(req, res) {
    try {
      const { id } = req.params;
      const eliminado = await triggerModel.eliminar(id);
      if (eliminado === 0) return res.status(404).json({ error: 'Trigger no encontrado' });

      res.json({ mensaje: 'Trigger eliminado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el trigger' });
    }
  }
};

module.exports = triggerController;