const User = require("../models/userModel");

class UserService {
  async getUsers() {
    return await User.find({}, "nombre email roles");
  }

  async getUserById(id) {
    return await User.findById(id);
  }

  async getUserByEmail(correo) {
    return await User.find({ email: correo });
  }

  async updateUserBasicInfo(id, user) {
    return await User.findByIdAndUpdate(
      id,
      {
        nombre: user["nombre"],
        telefono: user["telefono"],
        direccion: user["direccion"],
      },
      { new: false }
    );
  }

  async updateUserPassword(id, user) {
    return await User.findByIdAndUpdate(
      id,
      {
        password: user["password"],
      },
      { new: false }
    );
  }

  async updateUserRoles(id, user) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          roles: user["roles"],
        },
        { new: true }
      );
      console.log(`Roles actualizados para el usuario ${id}: ${user["roles"]}`);
      return updatedUser;
    } catch (error) {
      console.error("Error al actualizar los roles:", error.message);
      throw error;
    }
  }


  async createUser(data) {
    const user = new User(data);

    user.save();

    return user;
  }

  async cambiarEstadoUser(id) {
    const user = await this.getUserById(id);
    let estado = user["estado"];

    const newEstado = estado === true ? false : true;

    return await User.findByIdAndUpdate(
      id,
      {
        estado: newEstado,
      },
      { new: false }
    );
  }

  async getAdminCount() {
    return await User.countDocuments({ roles: "Admin" });
  }
}

module.exports = new UserService();
