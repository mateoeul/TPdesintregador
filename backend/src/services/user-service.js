import UserRepository from "../repositories/user-repository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

const UserService = {
    async register(user) {
        const { first_name, last_name, username, password } = user;
        console.log('USER',user )
        if (!first_name || first_name.length < 3) {
            return { success: false, message: "El nombre debe tener al menos 3 letras." };
        }
        if (!last_name || last_name.length < 3) {
            return { success: false, message: "El apellido debe tener al menos 3 letras." };
        }
        if (!validarEmail(username)) {
            return { success: false, message: "El email es invalido." };
        }
        if (!password || password.length < 3) {
            return { success: false, message: "La contraseña debe tener al menos 3 letras." };
        }
        const existe = await UserRepository.findByUsername(username);
        if (existe) {
            return { success: false, message: "El usuario ya existe." };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserRepository.create({ first_name, last_name, username, password: hashedPassword });
        return { success: true, message: "Usuario registrado correctamente." };
    },
    async login({ username, password }) {
        if (!validarEmail(username)) {
            return {
                status: 400,
                body: { success: false, message: "El email es invalido.", token: "" }
            };
        }
        const user = await UserRepository.findByUsername(username);
        if (!user) {
            return {
                status: 401,
                body: { success: false, message: "Usuario o clave inválida.", token: "" }
            };
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return {
                status: 401,
                body: { success: false, message: "Usuario o clave inválida.", token: "" }
            };
        }
        const token = jwt.sign({ id: user.id, first_name: user.first_name, last_name: user.last_name }, JWT_SECRET, { expiresIn: "1d" });
        return {
            status: 200,
            body: { success: true, message: "", token }
        };
    }
};

export default UserService; 