const { User } = require("../Model/User")
const bcrypt = require("bcryptjs");
const generateToken = require("../Utils/Auth");
const jwt = require("jsonwebtoken");


async function handleSignup(req, res) {
    console.log(req.body)
    if (!req || !req.body) {
        return res.status(400).json("No req or req.body found")
    }
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).json("Email or Password Missing")
    }
    const isPresent = await User.findOne({email});
    if (!isPresent) {
        return res.status(400).json("User already present")
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const user = {
        email: email,
        password: hashPassword
    }
    await User.create(user)
    return res.status(201).json("User Created")

}

async function handleLogin(req, res) {
    if (!req || !req.body) {
        return res.status(401).json("No req or req.body found")
    }
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).json("Email or Password Missing")
    }
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).json("No user found")
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = generateToken(user)
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "PRODUCTION" ? true : false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000
    });
    return res.status(200).json({
        message: "Login success",
        user: { id: user._id, email: user.email }
    });
}

async function handleLogout(req, res) {
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        secure: process.env.NODE_ENV === "PRODUCTION" ? true : false,
        sameSite: "strict",
        expires: new Date(0),
    });
    res.json("Logout Done")
}

async function handleMe(req, res) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json("No token");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) return res.status(404).json("User not found");
        return res.status(200).json({ user: { id: user._id, email: user.email } });
    } catch {
        return res.status(401).json("Invalid token");
    }
}

module.exports = { handleLogin, handleSignup, handleLogout, handleMe }