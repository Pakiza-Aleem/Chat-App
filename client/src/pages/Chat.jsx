import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import api from "../api";
import socket from "../socket";

import UserList from "../components/UserList";
import ChatThread from "../components/ChatThread";

import { logoutUser } from "../redux/authSlice";

export default function Chat() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  const [onlineCount, setOnlineCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState(new Set());

  const [unreadCounts, setUnreadCounts] = useState({});

  // --------------------------------
  // LOGOUT
  // --------------------------------

  const handleLogout = async () => {
    socket.disconnect();
    await dispatch(logoutUser());
  };

  // --------------------------------
  // LOAD USERS
  // --------------------------------

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const { data } = await api.get("/chat/users");

        setUsers(data.users || []);
      } catch (err) {
        console.error("Failed to load users:", err);
      }
    };

    loadUsers();
  }, []);

  // --------------------------------
  // SOCKET CONNECTION
  // --------------------------------

  useEffect(() => {
    if (!user?.id) return;

    socket.connect();

    // ------------------------------
    // ONLINE COUNT
    // ------------------------------

    const handleOnlineCount = (count) => {
      setOnlineCount(count);
    };

    // ------------------------------
    // ONLINE USERS
    // ------------------------------

    const handleOnlineUsers = (userIds) => {
      const normalizedIds = userIds.map((id) =>
        id.toString()
      );

      setOnlineUsers(
        new Set(normalizedIds)
      );
    };

    // ------------------------------
    // CHAT HISTORY
    // ------------------------------

    const handleHistory = (history) => {
      setMessages(history || []);
    };

    // ------------------------------
    // NEW MESSAGE
    // ------------------------------

    const handleMessage = (message) => {
      const currentUserId =
        user.id?.toString();

      const fromId =
        message.from?.toString();

      const toId =
        message.to?.toString();

      const selectedId =
        selectedUser?._id?.toString();

      // Message belongs to the currently
      // selected conversation ONLY when
      // both participants match.
      const isCurrentConversation =
        selectedId &&
        (
          (
            fromId === currentUserId &&
            toId === selectedId
          ) ||
          (
            fromId === selectedId &&
            toId === currentUserId
          )
        );

      if (isCurrentConversation) {
        setMessages((prev) => [
          ...prev,
          message,
        ]);

        // If current user received this
        // message while the chat is open,
        // mark it as read.
        if (toId === currentUserId) {
          socket.emit(
            "chat:read",
            selectedId
          );
        }

        return;
      }

      // Message belongs to another
      // conversation. Only create an
      // unread count if current user
      // is the receiver.
      if (toId === currentUserId) {
        setUnreadCounts((prev) => ({
          ...prev,
          [fromId]:
            (prev[fromId] || 0) + 1,
        }));
      }
    };

    // ------------------------------
    // INITIAL UNREAD COUNTS
    // ------------------------------

    const handleUnread = (items) => {
      const counts = {};

      items.forEach((item) => {
        counts[item.userId.toString()] =
          item.count;
      });

      setUnreadCounts(counts);
    };

    // ------------------------------
    // UNREAD UPDATE
    // ------------------------------

    const handleUnreadUpdate = ({
      userId,
      count,
    }) => {
      setUnreadCounts((prev) => ({
        ...prev,
        [userId.toString()]: count,
      }));
    };

    // ------------------------------
    // SOCKET EVENTS
    // ------------------------------

    socket.on(
      "online:count",
      handleOnlineCount
    );

    socket.on(
      "online:users",
      handleOnlineUsers
    );

    socket.on(
      "chat:history",
      handleHistory
    );

    socket.on(
      "chat:message",
      handleMessage
    );

    socket.on(
      "chat:unread",
      handleUnread
    );

    socket.on(
      "chat:unread:update",
      handleUnreadUpdate
    );

    // Ask server for unread messages
    socket.emit("chat:unread");

    // ------------------------------
    // CLEANUP
    // ------------------------------

    return () => {
      socket.off(
        "online:count",
        handleOnlineCount
      );

      socket.off(
        "online:users",
        handleOnlineUsers
      );

      socket.off(
        "chat:history",
        handleHistory
      );

      socket.off(
        "chat:message",
        handleMessage
      );

      socket.off(
        "chat:unread",
        handleUnread
      );

      socket.off(
        "chat:unread:update",
        handleUnreadUpdate
      );

      socket.disconnect();
    };
  }, [user?.id, selectedUser]);

  // --------------------------------
  // SELECT USER
  // --------------------------------

  const selectUser = (otherUser) => {
    setSelectedUser(otherUser);

    // Clear previous conversation
    setMessages([]);

    const otherUserId =
      otherUser._id.toString();

    // Load only this conversation
    socket.emit(
      "chat:history",
      otherUserId
    );

    // Mark messages from this user
    // as read
    socket.emit(
      "chat:read",
      otherUserId
    );
  };

  // --------------------------------
  // SEND MESSAGE
  // --------------------------------

  const sendMessage = (text) => {
    if (!selectedUser) return;

    if (!text || !text.trim()) return;

    socket.emit("chat:send", {
      to: selectedUser._id,
      text: text.trim(),
    });
  };

  // --------------------------------
  // UI
  // --------------------------------

  return (
    <div className="chat-page">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div>
            <h2>ChatApp</h2>

            <p>
              {onlineCount} users online
            </p>
          </div>

          <div className="my-profile">
            <strong>
              {user?.name}
            </strong>

            <button
              type="button"
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        <UserList
          users={users}
          selectedUser={selectedUser}
          onSelect={selectUser}
          onlineUsers={onlineUsers}
          unreadCounts={unreadCounts}
        />
      </aside>

      <main className="chat-area">
        <ChatThread
          selectedUser={selectedUser}
          messages={messages}
          currentUserId={user?.id}
          onSend={sendMessage}
        />
      </main>
    </div>
  );
}