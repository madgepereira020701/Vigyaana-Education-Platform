const jwt = require("jsonwebtoken");
const User = require("../models/user"); // keep using your Admin model file if needed
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

// Define your JWT_SECRET directly
const JWT_SECRET = process.env.JWT_SECRET; // Hardcoded secret key
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;
const FRONTEND_URL = process.env.FRONTEND_URL;

// Register user
const userregister = async (req, res) => {
  const { username, email, password, phone, address } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ isSuccess: false, message: "User already exists" });
    }

    // Create new user
    const newUser = new User({ username, email, password, phone, address });
    await newUser.save();

    res
      .status(201)
      .json({ isSuccess: true, message: "User registered successfully" });
  } catch (err) {
    console.error("Error in userRegister:", err);
    res.status(500).json({
      isSuccess: false,
      message: "An error occurred. Please try again later.",
    });
  }
};

// Login user
const userlogin = async (req, res) => {
  const { email, password } = req.body;

  console.log("Entered email:", email);
  console.log("Entered password:", password);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found in email");
      return res
        .status(400)
        .json({ isSuccess: false, message: "Invalid credentials" });
    }

    console.log("Stored hashed password:", user.password);

    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ isSuccess: false, message: "Invalid credentials" });
    }

    console.log("Entered password:", password);

    const token = jwt.sign(
      { userId: user._id, userName: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      isSuccess: true,
      data: {
        userId: user._id, // Add this line
        userName: user.username,
        token: token,
      },
    });
  } catch (err) {
    console.log("Error in userLogin", err);
    return res
      .status(500)
      .json({ isSuccess: false, message: "An error occurred" });
  }
};

// Update user password
const updatePassword = async (req, res) => {
  const { token } = req.params;
  const { newpassword, confirmpassword } = req.body;

  console.log("Received new password:", newpassword);

  if (!newpassword || !confirmpassword) {
    return res
      .status(400)
      .json({ isSuccess: false, message: "Both fields are required" });
  }

  if (newpassword !== confirmpassword) {
    return res
      .status(404)
      .json({ isSuccess: false, message: "Passwords do not match" });
  }

  try {
    console.log("Token:", token);

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(404).json({
        isSuccess: false,
        message: "User not found or token expired.",
      });
    }

    const isMatch = await bcrypt.compare(newpassword.trim(), user.password);
    if (isMatch) {
      console.log("Passwords cannot be similar to old one");
      return res.status(400).json({
        isSuccess: false,
        message: "New password cannot be same as the old one",
      });
    }

    user.password = newpassword.trim();
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    console.log("Updated password:", user.password);
    return res
      .status(200)
      .json({ isSuccess: true, message: "Password updated successfully" });
  } catch (err) {
    console.error("Error in updatePassword", err);
    return res
      .status(500)
      .json({ isSuccess: false, message: "An error occurred" });
  }
};

// Password reset request for user
const passwordresetrequest = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ isSuccess: false, message: "Email not found." });
    }

    const token = generatePasswordResetToken();

    try {
      await sendPasswordResetEmail(user, email, token);
      return res.status(200).json({ message: "Password reset email sent" });
    } catch (emailError) {
      console.error("Error sending password reset email:", emailError);
      res.status(500).json({ message: "An error occurred" });
    }
  } catch (err) {
    console.error("Error in passwordresetrequest:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

function generatePasswordResetToken() {
  const token = jwt.sign({ purpose: "passwordReset" }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
}

async function storeToken(user, token) {
  try {
    user.passwordResetToken = token;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    console.log(`Token stored for User ${token}`);
  } catch (error) {
    console.log("Error storing token:", error);
    throw error;
  }
}

async function sendPasswordResetEmail(user, email, token) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS, // Use an app-specific password for Gmail
    },
    tls: {
      rejectUnauthorized: false, // ⚠️ dev only
    },
  });

  const resetLink = `${FRONTEND_URL}/changepassword?token=${token}`;
  console.log("Reset Link:", resetLink); // Log the reset link for verification

  const mailOptions = {
    from: GMAIL_USER,
    to: email,
    subject: "Password Reset for Your Account",
    html: `<p>Click on the link below to reset your password</p>
           <a href="${resetLink}">Reset Password</a>`,
  };

  await transporter.sendMail(mailOptions);
  await storeToken(user, token);
}

module.exports = {
  userregister,
  userlogin,
  updatePassword,
  passwordresetrequest,
};
