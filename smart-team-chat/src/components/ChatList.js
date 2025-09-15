import React from "react";
import chats from "../data/chats.json";

function ChatList({ onSelectChat }) {
  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 20, color: "#2c3e50" }}>Chats</h2>
      {chats.map(chat => (
        <div
          key={chat.id}
          style={{
            background: "#f9f9f9",
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "12px",
            margin: "10px 0",
            cursor: "pointer",
            transition: "0.3s",
            boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#eef5ff")}
          onMouseLeave={e => (e.currentTarget.style.background = "#f9f9f9")}
          onClick={() => onSelectChat(chat)}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <b style={{ fontSize: "16px" }}>{chat.name}</b>
            <span style={{ color: "gray", fontSize: "12px" }}>{chat.time}</span>
          </div>
          <p style={{ margin: "5px 0", color: "#555" }}>{chat.lastMessage}</p>
        </div>
      ))}
    </div>
  );
}

export default ChatList;
