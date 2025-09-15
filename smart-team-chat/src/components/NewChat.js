import React, { useState } from "react";

function NewChat({ onBack }) {
  const [name, setName] = useState("");
  const [icebreaker, setIcebreaker] = useState("");

  const generateIcebreaker = () => {
    if (!name) return;

    const suggestions = [
      `Hi ${name}, how’s your day going?`,
      `Hey ${name}, excited to start this chat with you!`,
      `Hi ${name}, what’s the most interesting thing you worked on this week?`,
      `Hello ${name}, looking forward to collaborating with you.`,
      `Hi ${name}, if you could describe your mood in one emoji, what would it be?`
    ];

    // pick a random one each time
    const randomMsg = suggestions[Math.floor(Math.random() * suggestions.length)];
    setIcebreaker(randomMsg);
  };

  return (
    <div style={{ padding: 20 }}>
      <button
        onClick={onBack}
        style={{
          background: "#3498db",
          color: "white",
          border: "none",
          padding: "8px 12px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: 10
        }}
      >
        ← Back
      </button>
      <h2 style={{ color: "#2c3e50" }}>Start New Chat</h2>

      <input
        type="text"
        placeholder="Enter participant name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{
          padding: 10,
          margin: "10px 0",
          width: "100%",
          borderRadius: "8px",
          border: "1px solid #ddd"
        }}
      />

      <button
        onClick={generateIcebreaker}
        style={{
          background: "#27ae60",
          color: "white",
          border: "none",
          padding: "10px 14px",
          borderRadius: "8px",
          cursor: "pointer",
          marginTop: "10px"
        }}
      >
        Generate Icebreaker
      </button>

      {icebreaker && (
        <div
          style={{
            marginTop: 15,
            background: "#f4f6f7",
            padding: 15,
            borderRadius: "12px"
          }}
        >
          <h4 style={{ marginBottom: 8, color: "#2c3e50" }}>
            AI Icebreaker Suggestion:
          </h4>
          <p style={{ color: "#555" }}>
            <i>{icebreaker}</i>
          </p>
        </div>
      )}
    </div>
  );
}

export default NewChat;
