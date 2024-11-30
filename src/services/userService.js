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
}

module.exports = new UserService();
