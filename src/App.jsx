import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/mainlayout/MainLayout";
function App() {
  return (
    <Router>
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      {/* <Route path="profile/:id" element={<Profile />} />
      <Route path="account/edit" element={<EditProfile />} />
      <Route path="chat" element={<ChatPage />} /> */}
    </Route>

    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
  </Routes>
</Router>
    
  );
}

export default App;
