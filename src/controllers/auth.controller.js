const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { TOKEN_SECRET } = require("../config.js");
const { createAccessToken } = require("../libs/jwt");

exports.register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        const userFound = await User.findOne({ email });
        if (userFound)
            return res.status(400).json({ message: "El correo ya está en uso" });

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            nombre,
            email,
            password: passwordHash,
            roles: ["User"],
            fecha_registro: new Date(),
            estado: true,
        });
        

        const userSaved = await newUser.save();

        const token = await createAccessToken({ id: userSaved._id });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "none",
        });

        res.json({
            id: userSaved._id,
            nombre: userSaved.nombre,
            email: userSaved.email,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        const token = jwt.sign(
            { id: user._id, roles: user.roles },
            TOKEN_SECRET,
            { expiresIn: "1d" }
        );

        res
            .cookie("token", token, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV !== "development",
            })
            .status(200)
            .json({
                id: user._id,
                roles: user.roles,
                email: user.email,
                nombre: user.nombre,
            });
    } catch (error) {
        console.error("Error en el login:", error.message);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};


exports.verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false);

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
        if (error) return res.sendStatus(401);

        const userFound = await User.findById(user.id);
        if (!userFound) return res.sendStatus(401);

        return res.json({
            id: userFound._id,
            nombre: userFound.nombre,
            email: userFound.email,
            roles: userFound.roles,
        });
    });
};


exports.logout = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
    });
    return res.sendStatus(200);
};
