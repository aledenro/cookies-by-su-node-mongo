const User = require("../models/userModel");

class UserService {
  async getUsers() {
    return await User.find();
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
    return await User.findByIdAndUpdate(
      id,
      {
        roles: user["roles"],
      },
      { new: false }
    );
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
}

module.exports = new UserService();
