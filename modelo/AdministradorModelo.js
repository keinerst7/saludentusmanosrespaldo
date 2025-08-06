const dbService = require('./bd/Conexion');
const bcrypt = require('bcrypt');

class AdministradorModelo {
  // funcion para crear nuevos usuarios
  static async crearUsuarios(doc, name, tel, email, contras, rol) {
    const query = 'INSERT INTO usuarios (documento, nombres, telefono, correo, contrasena, rol) VALUES (?, ?, ?, ?, ?, ?)';

    try {
      // Generar el hash de la contraseña con bcrypt
      const salto = 10; // Nivel de seguridad de encriptación
      const contra = await bcrypt.hash(contras, salto);

      return await dbService.query(query, [doc, name, tel, email, contra, rol]);
    } catch (err) {
      throw new Error(`Error al crear su nueva cuenta: ${err.message}`);
    }
  }//cerrar crear usuario
  
}

module.exports = AdministradorModelo;