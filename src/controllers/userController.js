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
      return res.status(500).json({ error: err.message });
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
      return res.status(500).json({ error: err.message });
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
      return res.status(500).json({ error: err.message });
    }
  }

  async updateUserBasicInfo(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;

      const user = await userService.updateUserBasicInfo(id, data);

      if (!user || _.isEmpty(user)) {
        return res
          .status(404)
          .json({ error: `No se encontró un usuario con el id ${id}.` });
      }

      return res.json({ user: user });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async updateUserPassword(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;

      const user = await userService.updateUserPassword(id, data);

      if (!user || _.isEmpty(user)) {
        return res
          .status(404)
          .json({ error: `No se encontró un usuario con el id ${id}.` });
      }

      return res.json({ user: user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
  }

  async updateUserRoles(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;

      const user = await userService.updateUserRoles(id, data);

      if (!user || _.isEmpty(user)) {
        return res
          .status(404)
          .json({ error: `No se encontró un usuario con el id ${id}.` });
      }

      return res.json({ user: user });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async createUser(req, res) {
    try {
      const data = req.body;

      const user = await userService.createUser(data);

      return res.status(201).json({ user: user });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async cambiarEstadoUser(req, res) {
    try {
      const id = req.params.id;

      const user = await userService.cambiarEstadoUser(id);

      if (!user || _.isEmpty(user)) {
        return res
          .status(404)
          .json({ error: `No se encontró un usuario con el id ${id}.` });
      }

      return res.json({ user: user });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new UserController();
