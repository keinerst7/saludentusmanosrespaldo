const usersModelo = require('../modelo/usersModelo');

const usersControlador = {
  // listar: Función del controlador para obtener y devolver todos los usuarios.
  listar: async (req, res) => {
    try {
      const usuarios = await usersModelo.obtenerTodos();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los usuarios.' });
    }
  },

  // obtener: Función del controlador para obtener un usuario específico por su ID.
  obtener: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const usuario = await usersModelo.obtenerPorId(id);

      if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado.' });
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el usuario.' });
    }
  },

  // crear: Función del controlador para crear un nuevo usuario con los datos recibidos.
  crear: async (req, res) => {
    try {
      const usuario = req.body;
      const nuevoUsuario = await usersModelo.crear(usuario);
      res.status(201).json(nuevoUsuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // actualizar: Función del controlador para actualizar los datos de un usuario por su ID.
  actualizar: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const datos = req.body;
      const actualizado = await usersModelo.actualizar(id, datos);

      if (!actualizado) return res.status(404).json({ error: 'Usuario no encontrado para actualizar.' });
      res.json({ mensaje: 'Usuario actualizado con éxito.' });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el usuario.' });
    }
  },

  // eliminar: Función del controlador para eliminar un usuario por su ID.
  eliminar: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const eliminado = await usersModelo.eliminar(id);

      if (!eliminado) return res.status(404).json({ error: 'Usuario no encontrado para eliminar.' });
      res.json({ mensaje: 'Usuario eliminado con éxito.' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el usuario.' });
    }
  }
};

module.exports = usersControlador;