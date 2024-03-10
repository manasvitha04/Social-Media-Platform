import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <div
        style={{
          padding: "10px",
          borderRadius: "10px",
          width: "90%",
          background: "white",
          margin: "20px",
          borderBottom: "2px solid black",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Link to="/">Sign up</Link>
        <Link to="/login">Login</Link>
        <Link to="/createpost">Create Post</Link>
      </div>
    </>
  );
}
