export default function UserList({
  users,
  selectedUser,
  onSelect,
  onlineUsers,
  unreadCounts,
}) {
  return (
    <div className="user-list">
      {users.map((user) => {
        const isOnline = onlineUsers.has(user._id);
        const unread = unreadCounts[user._id] || 0;

        return (
          <button
            key={user._id}
            className={`user-item ${
              selectedUser?._id === user._id ? "selected" : ""
            }`}
            onClick={() => onSelect(user)}
          >
            <div className="avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div className="user-info">
              <strong>{user.name}</strong>

              <span>
                {isOnline ? "Online" : "Offline"}
              </span>
            </div>

            {isOnline && <span className="online-dot" />}

            {unread > 0 && (
              <span className="unread-badge">
                {unread}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}