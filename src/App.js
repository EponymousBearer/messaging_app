import React, { useState, useEffect } from "react";
import { Chat } from "./components/Chat";
import { Header } from "./components/Header";
import { AppWrapper } from "./components/AppWrapper";
import Cookies from "universal-cookie";
import { auth, db } from "./firebase-config.js";
import { collection, getDocs, addDoc } from "firebase/firestore";
import "./App.css";

const cookies = new Cookies();

function ChatApp() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] = useState(false);
  const [room, setRoom] = useState("");
  const [chatRooms, setChatRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const chatRoomsCollection = collection(db, "chatRooms");
      const chatRoomsSnapshot = await getDocs(chatRoomsCollection);
      const chatRoomsList = chatRoomsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setChatRooms(chatRoomsList);
    };

    fetchChatRooms();
  }, []);

  const handleCreateRoom = async () => {
    if (newRoomName.trim() === "") return;
    try {
      await addDoc(collection(db, "chatRooms"), {
        name: newRoomName,
        private: isPrivate,
        creator: auth.currentUser.displayName
      });
      setNewRoomName("");
      setIsPrivate(false);
      const chatRoomsCollection = collection(db, "chatRooms");
      const chatRoomsSnapshot = await getDocs(chatRoomsCollection);
      const chatRoomsList = chatRoomsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setChatRooms(chatRoomsList);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <section>
      <Header isInChat={isInChat} auth={isAuth} />
      {isAuth ? (
        <AppWrapper >
          {!isInChat ? (
            <div className="room">
              <div className="sidebar">
                <div className="chat-rooms">
                  <h3>Available Private Chat Rooms</h3>
                  <ul>
                    {chatRooms.map((chatRoom) => (
                      chatRoom.creator === auth.currentUser.displayName && chatRoom.private && (
                        <li key={chatRoom.id}>
                          <button
                            onClick={() => {
                              setRoom(chatRoom.name);
                              setIsInChat(true);
                            }}
                          >
                            {chatRoom.name} {chatRoom.private && "(Private)"}
                          </button>
                        </li>
                      )
                    ))}
                  </ul>
                </div>

                <div className="chat-rooms">
                  <h3>Available Public Chat Rooms</h3>
                  <ul>
                    {chatRooms.map((chatRoom) => (
                      chatRoom.private === false && (
                        <li key={chatRoom.id}>
                          <button
                            onClick={() => {
                              setRoom(chatRoom.name);
                              setIsInChat(true);
                            }}
                          >
                            {chatRoom.name} {chatRoom.private && "(Private)"}
                          </button>
                        </li>
                      )
                    ))}
                  </ul>
                </div>
              </div>
              <div className="content">
                <div className="type-room">
                  <label> Type room name: </label>
                  <input placeholder="Room Name" onChange={(e) => setRoom(e.target.value)} />
                  <button
                    onClick={() => {
                      setIsInChat(true);
                    }}
                  >
                    Join Room
                  </button>
                </div>

                <div className="type-room" >
                  <label>Create New Room: </label>
                  <input
                    type="text"
                    placeholder="Room Name"
                    value={newRoomName}
                    onChange={(e) => setNewRoomName(e.target.value)}
                  />
                  <span>
                    <input
                      type="checkbox"
                      checked={isPrivate}
                      onChange={(e) => setIsPrivate(e.target.checked)}
                    />
                    Private
                  </span>
                  <button onClick={handleCreateRoom}>Create Room</button>
                </div>
              </div>
            </div>
          ) : (
            <Chat room={room} setIsInChat={setIsInChat} />
          )}
        </AppWrapper>
      ) : (
        <div className="main">
          <h1>Welcome To Realtime Messaging Web Application</h1>
          <h2>Sign in to continue</h2>
        </div>
      )}
    </section>
  );
}

export default ChatApp;
