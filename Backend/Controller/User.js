const { User } = require("../Model/User")
const bcrypt = require("bcryptjs");

async function handleSignup(req, res) {
    if (!req || !req.body) {
        return res.status(400).json("No req or req.body found")
    }
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    if (!email || !hashPassword) {
        return res.status(401).json("Email or Password Missing")
    }
    const user = {
        email: email,
        password: hashPassword
    }
    const isPresent = await User.findOne({email:user.email})
    if (isPresent) { 
        return res.status(400).json("User already present") }
    await User.create(user)
    return res.status(201).json("User Created")
}

async function handleLogin(req, res) {
    if (!req || !req.body) {
        return res.json("No req or req.body found")
    }
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json("Email or Password Missing")
    }
    const user = await User.findOne({ email })
    if (!user) {
        return res.json("No user found")
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    return res.json("Login success")
}

module.exports = { handleLogin, handleSignup }