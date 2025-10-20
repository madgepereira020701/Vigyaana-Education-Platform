// controllers/userController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { Resend } = require("resend");

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL;
const resend = new Resend(process.env.RESEND_API_KEY);

// ---------------- Register ----------------
const userregister = async (req, res) => {
  const { username, email, password, phone, address } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ isSuccess: false, message: "User already exists" });
    }

    const newUser = new User({ username, email, password, phone, address });
    await newUser.save();

    res
      .status(201)
      .json({ isSuccess: true, message: "User registered successfully" });
  } catch (err) {
    console.error("Error in userRegister:", err);
    res
      .status(500)
      .json({
        isSuccess: false,
        message: "An error occurred. Please try again.",
      });
  }
};

// ---------------- Login ----------------
const userlogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ isSuccess: false, message: "Invalid credentials" });

    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword)
      return res
        .status(400)
        .json({ isSuccess: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, userName: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      isSuccess: true,
      data: { userId: user._id, userName: user.username, token },
    });
  } catch (err) {
    console.error("Error in userLogin:", err);
    res.status(500).json({ isSuccess: false, message: "An error occurred" });
  }
};

// ---------------- Update Password ----------------
const updatePassword = async (req, res) => {
  const { token } = req.params;
  const { newpassword, confirmpassword } = req.body;

  if (!newpassword || !confirmpassword)
    return res.status(400).json({ message: "Both fields are required" });

  if (newpassword !== confirmpassword)
    return res.status(400).json({ message: "Passwords do not match" });

  try {
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user)
      return res
        .status(404)
        .json({ message: "User not found or token expired." });

    const isMatch = await bcrypt.compare(newpassword.trim(), user.password);
    if (isMatch)
      return res
        .status(400)
        .json({ message: "New password cannot be same as old one" });

    user.password = newpassword.trim();
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error in updatePassword:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

// ---------------- Password Reset Request ----------------
const passwordresetrequest = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not found." });

    const token = generatePasswordResetToken();

    await sendPasswordResetEmail(user, email, token);
    res.status(200).json({ message: "Password reset email sent" });
  } catch (err) {
    console.error("Error in passwordresetrequest:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

// ---------------- Helpers ----------------
function generatePasswordResetToken() {
  return jwt.sign({ purpose: "passwordReset" }, JWT_SECRET, {
    expiresIn: "1h",
  });
}

async function storeToken(user, token) {
  user.passwordResetToken = token;
  user.passwordResetExpires = Date.now() + 3600000; // 1 hour
  await user.save();
  console.log(`Token stored for User ${user.email}`);
}

async function sendPasswordResetEmail(user, email, token) {
  const resetLink = `${FRONTEND_URL}/changepassword?token=${token}`;

  try {
    await resend.emails.send({
      from: "Vigyaana <onboarding@resend.dev>", // ✅ works instantly
      to: email,
      subject: "Password Reset for Your Account",
      html: `
        <p>Hello ${user.username || ""},</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>This link will expire in 1 hour.</p>
      `,
    });

    await storeToken(user, token);
    console.log("✅ Password reset email sent successfully");
  } catch (err) {
    console.error("❌ Error sending password reset email:", err);
    throw err;
  }
}

// ---------------- Exports ----------------
module.exports = {
  userregister,
  userlogin,
  updatePassword,
  passwordresetrequest,
};
