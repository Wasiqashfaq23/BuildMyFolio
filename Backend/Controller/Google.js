const { OAuth2Client } = require("google-auth-library");
const { User } = require("../Model/User");
const generateToken = require("../Utils/Auth");

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

const env = process.env.NODE_ENV?.toLowerCase();
const isProd = env === "production" || env === "deployment";
const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  maxAge: 24 * 60 * 60 * 1000,
};

async function handleGoogleAuth(req, res) {
  try {
    const { credential } = req.body;
    if (!credential) return res.status(400).json({ message: "No credential provided" });

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.OAUTH_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, sub: googleId } = payload;

    if (!email) return res.status(400).json({ message: "No email found in Google account" });

    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (!user) {
      user = await User.create({ email, googleId });
    } else if (!user.googleId) {
      user.googleId = googleId;
      await user.save();
    }

    const token = generateToken(user);
    res.cookie("token", token, cookieOptions);
    res.json({ user: { id: user._id, email: user.email, isAdmin: user.isAdmin } });
  } catch (err) {
    console.error("Google auth error:", err.message);
    res.status(401).json({ message: "Invalid Google token" });
  }
}

module.exports = { handleGoogleAuth };
