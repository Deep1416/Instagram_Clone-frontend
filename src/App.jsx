import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/mainlayout/MainLayout";
import Profile from "./components/Home/profile/Profile";
import EditProfile from "./components/Home/editProfile/EditProfile";
import ChatPage from "./components/chat/ChatPage";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "./config/soketSlice";
import { setOnlineUsers } from "./config/chatSlice";
function App() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    let socketio;

    if (user) {
      socketio = io(`http://localhost:8080`, {
        query: {
          userId: user._id,
        },
        transports: ["websocket"],
      });

      dispatch(setSocket(socketio));

      // Listen to the event for online users
      socketio.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
    }

    // Cleanup function to close socket when component unmounts or user logs out
    return () => {
      if (socketio) {
        socketio.close();
        dispatch(setSocket(null));
      }
    };
  }, [user, dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="account/edit" element={<EditProfile />} />
          <Route path="chat" element={<ChatPage />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
