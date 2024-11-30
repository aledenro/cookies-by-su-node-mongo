const userService = require("../services/userService");
const _ = require("lodash");

class UserController {
  async getUsers(req, res) {
    try {
      const users = await userService.getUsers();

      if (!users || _.isEmpty(users)) {
        return res.status(404).json({ error: "No se encontraron usuarios." });
      }

      return res.json({ users: users });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }

  async getUserById(req, res) {
    try {
      const id = req.params.id;
      const user = await userService.getUserById(id);

      if (!user || _.isEmpty(user)) {
        return res
          .status(404)
          .json({ error: `No se encontró un usuario con el id ${id}.` });
      }

      return res.json({ user: user });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }

  async getUserByCorreo(req, res) {
    try {
      const email = req.params.email;
      const user = await userService.getUserByEmail(email);

      if (!user || _.isEmpty(user)) {
        return res
          .status(404)
          .json({ error: `No se encontró un usuario con el email ${email}.` });
      }

      return res.json({ user: user });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
}

module.exports = new UserController();
