import React, { useState } from "react";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import NewChat from "./components/NewChat";

function App() {
  const [screen, setScreen] = useState("list");
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "30px auto",
        fontFamily: "Arial, sans-serif",
        background: "white",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        padding: 20
      }}
    >
      {screen === "list" && (
        <>
          <ChatList
            onSelectChat={(chat) => {
              setSelectedChat(chat);
              setScreen("chat");
            }}
          />
          <button
            onClick={() => setScreen("new")}
            style={{
              background: "#9b59b6",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "10px",
              marginTop: "15px",
              cursor: "pointer"
            }}
          >
            + New Chat
          </button>
        </>
      )}
      {screen === "chat" && selectedChat && (
        <ChatWindow
          chat={selectedChat}
          onBack={() => {
            setSelectedChat(null);
            setScreen("list");
          }}
        />
      )}
      {screen === "new" && <NewChat onBack={() => setScreen("list")} />}
    </div>
  );
}

export default App;
