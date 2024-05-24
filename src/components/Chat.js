import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import "../styles/Chat.css";

export const Chat = ({ room, setIsInChat }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
    });

    return () => unsuscribe();
  }, [messagesRef, room]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;

    try {
      await addDoc(messagesRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        room,
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }

  };
  const handleExitRoom = () => {
    setIsInChat(false); // Set isInChat to false to exit the chat
  };

  return (
    <div className="chat-app">
      <div className="chat-header">
        <h1>Welcome to: {room.toUpperCase()}</h1>
        <button onClick={handleExitRoom} className="exit">
          Exit Room
        </button>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <p>{message.text}</p>
            <span className="user">
              {message.user}:{" "}
              {new Date(
                message.createdAt.seconds * 1000 +
                message.createdAt.nanoseconds / 1000000
              ).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="new-message-input"
          placeholder="Type your message here..."
        />
        <button type="submit">
          Send
        </button>
      </form>
    </div>
  );
};
