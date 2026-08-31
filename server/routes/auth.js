const express = require("express");
const {
  register,
  login,
  logout,
  me,
} = require("../controllers/authController");

const protect = require("../middleware/auth");

const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Current logged-in user
router.get("/me", protect, me);

// Logout
router.post("/logout", logout);

module.exports = router;