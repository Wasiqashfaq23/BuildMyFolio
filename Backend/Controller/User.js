const { User } = require("../Model/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../Utils/Auth");
const jwt = require("jsonwebtoken");

async function handleSignup(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const isPresent = await User.findOne({ email });
    if (isPresent) {
      return res.status(409).json({ message: "User already exists" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({ email, password: hashPassword });
    const token = generateToken(newUser);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" || false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      message: "User created successfully",
      user: { id: newUser._id, email: newUser.email, isAdmin: newUser.isAdmin }
    });
  } catch (err) {
    console.error("Signup error:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" || false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "Login successful",
      user: { id: user._id, email: user.email, isAdmin: user.isAdmin }
    });
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function handleLogout(req, res) {
  try {
    
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function handleMe(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "Success",
      user: { id: user._id, email: user.email, isAdmin: user.isAdmin }
    });

  } catch (err) {
    console.error("Me error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = { handleLogin, handleSignup, handleLogout, handleMe };