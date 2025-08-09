const modelo = require('../modelo/completedMeditationsModelo');

const controlador = {
  listar: async (req, res) => {
    try {
      const datos = await modelo.obtenerTodos();
      res.json(datos);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener las meditaciones completadas.' });
    }
  },

  obtener: async (req, res) => {
    try {
      const { id } = req.params;
      const dato = await modelo.obtenerPorId(id);
      if (!dato) return res.status(404).json({ error: 'No encontrado.' });
      res.json(dato);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener el dato.' });
    }
  },

crear: async (req, res) => {
  try {
    const { user_id, meditation_id, completed_date } = req.body;
    if (!user_id || !meditation_id || !completed_date) {
      return res.status(400).json({ error: 'Campos requeridos: user_id, meditation_id, completed_date' });
    }
    const nuevoId = await modelo.crear({ user_id, meditation_id, completed_date });
    res.status(201).json({ mensaje: 'Creado exitosamente', id: nuevoId });
  } catch (err) {
    console.error('🔴 Error al crear registro:', err); // <--- AQUI
    res.status(500).json({ error: 'Error al crear el registro.' });
  }
},


actualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const { user_id, meditation_id, completed_date } = req.body;
      if (!user_id || !meditation_id || !completed_date) {
        return res.status(400).json({ error: 'Campos requeridos: user_id, meditation_id, completed_date' });
      }
      const actualizado = await modelo.actualizar(id, { user_id, meditation_id, completed_date });
      if (!actualizado) return res.status(404).json({ error: 'Registro no encontrado' });
      res.json({ mensaje: 'Actualizado correctamente' });
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar.' });
    }
  },
  

  eliminar: async (req, res) => {
    try {
      const { id } = req.params;
      const eliminado = await modelo.eliminar(id);
      if (!eliminado) return res.status(404).json({ error: 'Registro no encontrado' });
      res.json({ mensaje: 'Eliminado correctamente' });
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar.' });
    }
  }
};

module.exports = controlador;