const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config");

exports.auth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido" });
    }
    req.user = user; 
    next();
  });
};

exports.checkRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || !req.user.roles || !req.user.roles.includes(requiredRole)) {
      return res.status(403).json({ message: "Acceso denegado" });
    }
    next();
  };
};
