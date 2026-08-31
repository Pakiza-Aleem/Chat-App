const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
});

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        msg: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res
      .cookie("token", createToken(user), cookieOptions)
      .status(201)
      .json({
        user: publicUser(user),
      });
  } catch (err) {
    res.status(500).json({
      msg: "Registration failed",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        msg: "Invalid credentials",
      });
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordCorrect) {
      return res.status(400).json({
        msg: "Invalid credentials",
      });
    }

    res
      .cookie("token", createToken(user), cookieOptions)
      .status(200)
      .json({
        user: publicUser(user),
      });
  } catch (err) {
    res.status(500).json({
      msg: "Login failed",
    });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token", cookieOptions);

  res.json({
    msg: "Logged out successfully",
  });
};

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(401).json({
        msg: "User not found",
      });
    }

    res.json({
      user: publicUser(user),
    });
  } catch (err) {
    res.status(500).json({
      msg: "Failed to get user",
    });
  }
};