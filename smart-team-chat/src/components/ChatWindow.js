import React, { useState } from "react";

function ChatWindow({ chat, onBack }) {
  const dummyMessages = {
    Alice: [
      { from: "Alice", text: "Hey, did you check the report?" },
      { from: "You", text: "Not yet, I’ll do it today." }
    ],
    Bob: [
      { from: "Bob", text: "Let’s meet at 3 PM." },
      { from: "You", text: "Sure, see you then!" }
    ],
    Charlie: [
      { from: "Charlie", text: "No, I don’t think this will work." },
      { from: "You", text: "Let’s find another way." }
    ]
  };

  const [messages] = useState(dummyMessages[chat.name] || []);
  const [aiSummary, setAiSummary] = useState("");
  const [aiReply, setAiReply] = useState("");
  const [detectedTone, setDetectedTone] = useState("");

  // ✅ Generate AI Summary (independent of tone)
  const generateSummary = () => {
    const lastMsg = chat.lastMessage.toLowerCase();
    let summary = "This chat is about general discussion.";

    if (lastMsg.includes("meet")) summary = "This chat is about scheduling a meeting.";
    else if (lastMsg.includes("report")) summary = "This chat is about reviewing the report.";
    else if (lastMsg.includes("deadline")) summary = "This chat is about a project deadline.";
    else if (lastMsg.includes("update")) summary = "This chat is about giving an update.";

    setAiSummary(summary);
  };

  // ✅ Generate Smart Reply with context-aware negative responses
  const generateSmartReply = () => {
    // Use the actual last message from the thread
    const lastMsg =
      messages.length > 0
        ? messages[messages.length - 1].text.toLowerCase()
        : chat.lastMessage.toLowerCase();

    let tone = "neutral";
    let reply = "Okay, noted.";

    if (lastMsg.includes("not yet") || lastMsg.includes("not done")) {
      tone = "negative";
      reply = "Not yet, but I’m working on it. 🔄";
    } else if (lastMsg.startsWith("no") || lastMsg.includes("don’t think")) {
      tone = "negative";
      reply = "I see your point — let’s rethink this together. 🤝";
    } else if (lastMsg.includes("not")) {
      tone = "negative";
      reply = "Got it, we’ll adjust accordingly. 💡";
    } else if (lastMsg.includes("meet") || lastMsg.includes("call")) {
      tone = "formal";
      reply = "Sounds good! Looking forward to it. 😊";
    } else if (lastMsg.includes("report") || lastMsg.includes("update")) {
      tone = "professional";
      reply = "Thanks for the update, I’ll review it soon. 📑";
    } else if (lastMsg.includes("deadline") || lastMsg.includes("urgent")) {
      tone = "urgent";
      reply = "Let’s prioritize this and get it done. ⏳";
    } else if (lastMsg.includes("hey") || lastMsg.includes("hi")) {
      tone = "friendly";
      reply = "Hey there! How’s everything going? 😄";
    }

    setDetectedTone(tone);
    setAiReply(reply);
  };

  return (
    <div style={{ padding: 20 }}>
      {/* Back button */}
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

      <h2 style={{ color: "#2c3e50" }}>Chat with {chat.name}</h2>

      {/* Chat thread */}
      <div
        style={{
          margin: "20px 0",
          border: "1px solid #ddd",
          borderRadius: "12px",
          background: "#fafafa",
          padding: 10,
          height: 250,
          overflowY: "auto"
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.from === "You" ? "flex-end" : "flex-start",
              marginBottom: "8px"
            }}
          >
            <div
              style={{
                background: msg.from === "You" ? "#3498db" : "#ecf0f1",
                color: msg.from === "You" ? "white" : "black",
                padding: "8px 12px",
                borderRadius: "15px",
                maxWidth: "70%"
              }}
            >
              <b>{msg.from}:</b> {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* AI buttons */}
      <div style={{ marginTop: 15 }}>
        <button
          onClick={generateSummary}
          style={{
            background: "#2ecc71",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "8px",
            marginRight: "10px",
            cursor: "pointer"
          }}
        >
          Summarize Thread
        </button>
        <button
          onClick={generateSmartReply}
          style={{
            background: "#f39c12",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Smart Reply Suggestion
        </button>

        {/* AI Results */}
        {aiSummary && (
          <div
            style={{
              marginTop: 10,
              background: "#e8f8f5",
              padding: "10px",
              borderRadius: "10px",
              maxWidth: "80%"
            }}
          >
            <p style={{ margin: 0, color: "#16a085" }}>
              <b>AI Summary:</b> {aiSummary}
            </p>
          </div>
        )}
        {detectedTone && (
          <div
            style={{
              marginTop: 10,
              background: "#ebf5fb",
              padding: "10px",
              borderRadius: "10px",
              maxWidth: "80%"
            }}
          >
            <p style={{ margin: 0, color: "#2980b9" }}>
              <b>AI detected tone:</b> {detectedTone}
            </p>
          </div>
        )}
        {aiReply && (
          <div
            style={{
              marginTop: 10,
              background: "#f5eef8",
              padding: "10px",
              borderRadius: "10px",
              maxWidth: "80%"
            }}
          >
            <p style={{ margin: 0, color: "#8e44ad", whiteSpace: "pre-wrap" }}>
              <b>AI Suggestion:</b> {aiReply}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatWindow;
