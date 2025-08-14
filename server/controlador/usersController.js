const UserModel = require('../modelo/usersModel');
const bcrypt = require('bcrypt');

class UserController {
  static async getAll(req, res) {
    try {
      const users = await UserModel.getAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Nuevo método para login
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validar que se envíen ambos campos
      if (!email || !password) {
        return res.status(400).json({ error: "Email y contraseña son obligatorios" });
      }

      
      // Buscar usuario por email
      const user = await UserModel.getByEmail(email);
      // return res.status(200).json({ message: "Login exitoso" });
      if (!user) {
        return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
      }

      // Comparar contraseñas
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);
      if (!isMatch) {
        return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
      }

            // Devolver respuesta
      res.status(200).json({
        message: "Login exitoso",
    
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const user = await UserModel.getById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const newUser = await UserModel.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const updatedUser = await UserModel.update(req.params.id, req.body);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const result = await UserModel.delete(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;