import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function CreatePost() {
  const navigate = useNavigate();
  const storeduser = JSON.parse(localStorage.getItem("user"));
  const [isloading, setIsloading] = useState(false);
  const [img, setImg] = useState();
  const handlepost = (e) => {
    e.preventDefault();
    setIsloading(true);
    var reader = new FileReader();
    reader.readAsDataURL(img.target.files[0]);
    reader.onload = async () => {
      await axios.post("http://localhost:5000/api/post", {
        username: storeduser.username,
        base64: reader.result,
      });
      const resp = await axios.patch(
        `http://localhost:5000/api/user/${storeduser.username}`,
        {
          posts: storeduser.posts + 1,
        }
      );
      localStorage.setItem("user", JSON.stringify(resp.data.response));
      setIsloading(false);
      navigate(`/user/${storeduser.username}`);
    };
    reader.onerror = (error) => {
      console.log("err: ", error);
    };
  };
  return (
    <>
      <div className="form__input-group" style={{ margin: "20px" }}>
        <div style={{ display: "flex" }}>
          <input
            // onChange={(e) => setUsername(e.target.value)}
            type="file"
            id="searchusername"
            className="form__input"
            autoFocus
            placeholder="Search for a User"
            onChange={(e) => setImg(e)}
            required
          />
          {isloading ? (
            <>
              <button
                className="form__button"
                disabled
                style={{ cursor: "progress", width: "30%" }}
              >
                Creating post
              </button>
            </>
          ) : (
            <>
              <button
                className="form__button"
                onClick={handlepost}
                style={{ width: "30%" }}
              >
                Create post
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
