export default function ChatThread({
  selectedUser,
  messages,
  currentUserId,
  onSend,
}) {
  if (!selectedUser) {
    return (
      <div className="empty-chat">
        <h2>WhatsApp Style Chat</h2>
        <p>
          Select a user from the left to start chatting
        </p>
      </div>
    );
  }

  return (
    <div className="chat-thread">
      <div className="chat-header">
        <div className="avatar">
          {selectedUser.name.charAt(0).toUpperCase()}
        </div>

        <div>
          <strong>{selectedUser.name}</strong>
          <p>One-to-one chat</p>
        </div>
      </div>

      <div className="messages">
        {messages.map((message) => {
          const mine =
            message.from === currentUserId ||
            message.from?._id === currentUserId;

          return (
            <div
              key={message._id}
              className={`message ${
                mine ? "mine" : "theirs"
              }`}
            >
              <span>{message.text}</span>

              <small>
                {new Date(
                  message.createdAt
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}

                {mine && message.read && (
                  <span className="read-ticks"> ✓✓</span>
                )}
              </small>
            </div>
          );
        })}
      </div>

      <MessageForm onSend={onSend} />
    </div>
  );
}

function MessageForm({ onSend }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const text = e.target.message.value.trim();

    if (!text) return;

    onSend(text);

    e.target.reset();
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        name="message"
        placeholder="Type a message..."
        autoComplete="off"
      />

      <button type="submit">Send</button>
    </form>
  );
}