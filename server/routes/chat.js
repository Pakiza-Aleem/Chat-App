const express = require("express");

const {
  getUsers,
  getMessages,
} = require("../controllers/chatController");

const protect = require("../middleware/auth");

const router = express.Router();

// Every chat route requires login
router.use(protect);

// Get all users except myself
router.get("/users", getUsers);

// Get conversation with one user
router.get("/messages/:userId", getMessages);

module.exports = router;