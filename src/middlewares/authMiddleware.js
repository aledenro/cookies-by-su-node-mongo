const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config");

exports.auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No autorizado. Token no proporcionado." });
  }

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido." });
    }
    console.log("Usuario autenticado:", user); 
    req.user = user;
    next();
  });
};

exports.checkRole = (requiredRole) => {
  return (req, res, next) => {
    console.log("Roles del usuario:", req.user.roles); 
    if (!req.user || !req.user.roles || !req.user.roles.includes(requiredRole)) {
      return res.status(403).json({ message: "Acceso denegado. No tienes el rol necesario." });
    }
    next();
  };
};
