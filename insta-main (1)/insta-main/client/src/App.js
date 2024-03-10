import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
function App() {
  const [username, setUsername] = useState("");
  return (
    <>
      <Navbar />
      <div className="form__input-group" style={{ margin: "20px" }}>
        <div style={{ display: "flex" }}>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="search"
            id="searchusername"
            className="form__input"
            autoFocus
            placeholder="Search for a User"
            required
          />
          <a href={`/user/${username}`} style={{ width: "30%" }}>
            <button className="form__button" style={{ background: "orange" }}>
              Search
            </button>
          </a>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/user/:username" element={<UserProfile />}></Route>
        <Route path="/createpost" element={<CreatePost />}></Route>
      </Routes>
    </>
  );
}

export default App;
