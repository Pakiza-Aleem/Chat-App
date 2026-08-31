const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const Message = require("./models/Message");

const onlineUsers = new Map();

const setupSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  // Send the IDs of all currently online users
  const emitOnlineUsers = () => {
    io.emit(
      "online:users",
      Array.from(onlineUsers.keys())
    );
  };

  // Socket authentication
  io.use((socket, next) => {
    try {
      const cookies = cookie.parse(
        socket.handshake.headers.cookie || ""
      );

      const token = cookies.token;

      if (!token) {
        return next(
          new Error("Not authenticated")
        );
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      socket.userId = decoded.id.toString();

      next();
    } catch (err) {
      console.error(
        "Socket authentication error:",
        err
      );

      next(
        new Error(
          "Invalid or expired token"
        )
      );
    }
  });

  // New connection
  io.on("connection", (socket) => {
    const userId = socket.userId.toString();

    // -----------------------------
    // ONLINE USERS
    // -----------------------------

    if (!onlineUsers.has(userId)) {
      onlineUsers.set(userId, new Set());
    }

    onlineUsers
      .get(userId)
      .add(socket.id);

    io.emit(
      "online:count",
      onlineUsers.size
    );

    emitOnlineUsers();

    // -----------------------------
    // CHAT HISTORY
    // -----------------------------

    socket.on(
      "chat:history",
      async (otherUserId) => {
        try {
          const otherId =
            otherUserId.toString();

          const messages =
            await Message.find({
              $or: [
                {
                  from: userId,
                  to: otherId,
                },
                {
                  from: otherId,
                  to: userId,
                },
              ],
            }).sort({
              createdAt: 1,
            });

          socket.emit(
            "chat:history",
            messages
          );
        } catch (err) {
          console.error(
            "Chat history error:",
            err
          );

          socket.emit(
            "chat:error",
            {
              message:
                "Unable to load chat history.",
            }
          );
        }
      }
    );

    // -----------------------------
    // SEND MESSAGE
    // -----------------------------

    socket.on(
      "chat:send",
      async ({ to, text }) => {
        try {
          if (
            !to ||
            !text ||
            !text.trim()
          ) {
            return;
          }

          const receiverId =
            to.toString();

          const message =
            await Message.create({
              from: userId,
              to: receiverId,
              text: text.trim(),
            });

          // Send message back to sender
          socket.emit(
            "chat:message",
            message
          );

          // Send message to receiver
          const receiverSockets =
            onlineUsers.get(
              receiverId
            );

          if (receiverSockets) {
            for (
              const socketId of receiverSockets
            ) {
              io.to(socketId).emit(
                "chat:message",
                message
              );
            }
          }
        } catch (err) {
          console.error(
            "Send message error:",
            err
          );

          socket.emit(
            "chat:error",
            {
              message:
                "Message could not be sent.",
            }
          );
        }
      }
    );

    // -----------------------------
    // UNREAD MESSAGES
    // -----------------------------

    socket.on(
      "chat:unread",
      async () => {
        try {
          const messages =
            await Message.find({
              to: userId,
              read: false,
            });

          const counts = {};

          messages.forEach(
            (message) => {
              const senderId =
                message.from.toString();

              counts[senderId] =
                (counts[senderId] || 0) +
                1;
            }
          );

          const result =
            Object.entries(
              counts
            ).map(
              ([senderId, count]) => ({
                userId: senderId,
                count,
              })
            );

          socket.emit(
            "chat:unread",
            result
          );
        } catch (err) {
          console.error(
            "Unread messages error:",
            err
          );
        }
      }
    );

    // -----------------------------
    // MARK CHAT AS READ
    // -----------------------------

    socket.on(
      "chat:read",
      async (otherUserId) => {
        try {
          const otherId =
            otherUserId.toString();

          await Message.updateMany(
            {
              from: otherId,
              to: userId,
              read: false,
            },
            {
              $set: {
                read: true,
              },
            }
          );

          socket.emit(
            "chat:unread:update",
            {
              userId: otherId,
              count: 0,
            }
          );
        } catch (err) {
          console.error(
            "Mark read error:",
            err
          );
        }
      }
    );

    // -----------------------------
    // DISCONNECT
    // -----------------------------

    socket.on(
      "disconnect",
      () => {
        const userSockets =
          onlineUsers.get(
            userId
          );

        if (!userSockets) {
          return;
        }

        userSockets.delete(
          socket.id
        );

        if (
          userSockets.size === 0
        ) {
          onlineUsers.delete(
            userId
          );
        }

        io.emit(
          "online:count",
          onlineUsers.size
        );

        emitOnlineUsers();
      }
    );
  });

  return io;
};

module.exports = setupSocket;