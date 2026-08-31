const User = require("../models/User");
const Message = require("../models/Message");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.user.id },
    }).select("name email");

    res.json({ users });
  } catch (err) {
    res.status(500).json({
      msg: "Failed to load users",
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { from: req.user.id, to: userId },
        { from: userId, to: req.user.id },
      ],
    }).sort({ createdAt: 1 });

    res.json({ messages });
  } catch (err) {
    res.status(500).json({
      msg: "Failed to load messages",
    });
  }
};